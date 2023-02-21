const users = [];

const addUser = ({ id, username, room }) => {
  // sanitizing the data:
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validaing the username and room:
  if (!username || !room) {
    return {
      error: "Username and Room are required..!",
    };
  }

  // Checking for exisiting username in the room:
  const exisitingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // Validate the username inside the room:\
  if (exisitingUser) {
    return {
      error: "Username is in use",
    };
  }

  //Store User in users array"
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);

  return user;
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  const usersInRoom = users.filter((user) => user.room === room);

  return usersInRoom;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
