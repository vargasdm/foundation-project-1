function validateResponse(receivedData) {
    if (!receivedData.username || !receivedData.password) {
      return false;
    }
    return true;
  }
  module.exports = {
    validateResponse
  }