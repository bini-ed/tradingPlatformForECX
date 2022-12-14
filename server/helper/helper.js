const users = [];
const addUserToAuctionRoom = ({ userId, auctionRoomId }) => {
  const exist = users.find(
    (user) => user.auctionRoomId === auctionRoomId && user.userId === userId
  );
  if (exist) {
    return { error: "You are already registered for this auction" };
  }
  const user = { userId, auctionRoomId };
  users.push(user);
  return { user };
};
const removeUserFromAuctionRoom = ({ socketId }) => {
  const exist = users.findIndex((user) => user.socketId === socketId);
  if (exist != -1) {
    return users.splice(exist, 1)[0];
  }

  users.push(user);
  console.log(users);
  return { user };
};
module.exports = { addUserToAuctionRoom };
