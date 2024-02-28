const ticketDAO = require("../repository/ticketDAO.js");
const uuid = require("uuid");

let ticketQueue = [];

async function getTickets(paramUser) {
  let data = await ticketDAO.getTicketsByUser(paramUser);
  return data;
}

async function getPendingTickets(status) {
  let data = await ticketDAO.getTicketsByPending(status);
  return data;
}

async function postTicket(requestData) {
  if (validateTicketData(requestData)) {
    let newTicketId = uuid.v4();
    console.log(ticketQueue);
    ticketQueue.push(newTicketId);
    console.log(ticketQueue);
    let data = await ticketDAO.createTicket({
      ticket_id: newTicketId,
      user: requestData.user,
      description: requestData.description,
      amount: requestData.amount,
      status: "Pending",
    });

    return data;
  }
  return null;
}

async function processTicket(status, queryId) {
  let data = await ticketDAO.updateTicket(status, queryId);
  ticketQueue.shift();
  console.log(ticketQueue);
  return data;
}

function validateTicketData(receivedData) {
  if (!receivedData.user || !receivedData.description || !receivedData.amount) {
    return false;
  }
  return true;
}

module.exports = {
  postTicket,
  processTicket,
  getTickets,
  getPendingTickets,
};
