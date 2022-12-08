import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { io } from "socket.io-client";
import Header from "../../components/Header";

const JoinAuction = () => {
  const { productId } = useParams();
  const { user } = useContext(AuthContext);
  const [enrolledAuction, setEnrolledAuction] = useState([]);
  const [laoding, setLoading] = useState(false);

  const [bidder, setBidder] = useState([]);
  const [msg, setMsg] = useState([]);
  const [chat, setChat] = useState("");

  const newSocket = io("http://localhost:5000");
  useEffect(() => {
    newSocket.emit("joinAuctionRoom", {
      auctionRoomId: productId,
      userId: user.id,
      name: user.firstName,
    });

    newSocket.on("receiveBid", (res) => {
      console.log("res", res);
      setMsg([...msg, res]);
    });
    return () => {
      newSocket.disconnect();
      newSocket.off();
    };
  }, []);

  const handleMsg = () => {
    newSocket.emit("sendBid", { chat });
    setChat("");
  };

  return (
    <div>
      <Header ref={[]} />
      {/* {bidder.map((items, index) => (
        <p key={index}>{items} joined</p>
      ))} */}
      <div className="flex flex-col">
        {msg.map((items, index) => (
          <p key={index}>{items}</p>
        ))}
      </div>
      <input
        type={"text"}
        placeholder="Enter text"
        value={chat}
        onChange={(e) => setChat(e.currentTarget.value)}
      ></input>
      <button onClick={handleMsg}>Send</button>
    </div>
  );
};

export default JoinAuction;
