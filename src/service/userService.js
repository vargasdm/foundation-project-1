const userDao = require("../repository/userDAO.js");
const uuid = require("uuid");
const { validateResponse } = require("../util/middleware");

async function postUser(receivedData) {
  if (validateResponse(receivedData)) {
    if (!receivedData.role) {
      receivedData.role = "employee";
    }

    let data = await userDao.createUser({
      username: receivedData.username,
      password: receivedData.password,
      id: uuid.v4(),
      role: receivedData.role,
    });
    return data;
  }

  return null;
}

async function loginUser(receivedData) {
  if (validateResponse(receivedData)) {
    let data = await userDao.getUserByUsername({
      username: receivedData.username,
      password: receivedData.password,
    });
    return data;
  }

  return null;
}

module.exports = {
  postUser,
  loginUser,
};
