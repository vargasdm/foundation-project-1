const ticketDAO = require("../repository/ticketDAO.js");
const uuid = require("uuid");
const { validateTicketCredentials } = require("../util/middleware");

async function postTicket(requestData) {
  if (validateTicketCredentials(requestData)) {
    let data = await ticketDAO.createTicket({
      ticket_id: uuid.v4(),
      user: requestData.user,
      description: requestData.description,
      amount: requestData.amount,
      status: "pending",
    });
    return data;
  }
  return null;
}

module.exports = {
  postTicket,
};
