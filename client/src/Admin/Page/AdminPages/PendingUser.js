import React, { useEffect, useState } from "react";
import CustomAppTable from "../../../components/CustomAppTable";
import { getPendingUser } from "../../../service/userService";
import { useNavigate } from "react-router-dom";

const PendingUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getPendingUser();
      if (data) setUsers(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-10">
      {users.length ? (
        <table className="table-auto justify-center border-slate-500 w-[100%]">
          <thead className="bg-slate-800 w-[100%]">
            <tr>
              <th className="border text-white p-2 border-slate-600">
                First Name
              </th>
              <th className="border text-white p-2 border-slate-600">
                Last Name
              </th>
              <th className="border text-white p-2 border-slate-600">Email</th>

              <th className="border text-white p-2 border-slate-600">
                Approved
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.map((product, index) => (
              <tr
                onClick={() => {
                  navigate(`detail/${product._id}`);
                }}
                className="cursor-pointer  bg-slate-500 hover:bg-slate-400"
                key={index}
              >
                <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                  {product?.firstName}
                </td>
                <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                  {product?.lastName}
                </td>
                <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                  {product?.email}
                </td>
                <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                  {product?.approved ? (
                    <p className="text-lg bg-[#2bb92b] rounded-md">Approved</p>
                  ) : (
                    <p className="text-lg bg-[#ae4328] rounded-md">
                      Not Approved
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="font-mono text-[brown]">No user found</p>
      )}
    </div>
  );
};

export default PendingUser;
