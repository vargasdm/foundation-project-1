const userDao = require("../repository/userDAO.js");
const uuid = require("uuid");

async function postUser(requestData) {
  if (validateResponseCredentials(requestData)) {
    if (!requestData.role) {
      requestData.role = "employee";
    }

    let data = await userDao.createUser({
      username: requestData.username,
      password: requestData.password,
      id: uuid.v4(),
      role: requestData.role,
    });
    return data;
  }
  return null;
}

async function loginUser(requestData) {
  if (validateResponseCredentials(requestData)) {
    let data = await userDao.getUserByUsername({
      username: requestData.username,
      password: requestData.password,
    });

    return data;
  }

  return null;
}

function validateResponseCredentials(receivedData) {
  if (!receivedData.username || !receivedData.password) {
    return false;
  }
  return true;
}

module.exports = {
  postUser,
  loginUser,
  validateResponseCredentials,
};
