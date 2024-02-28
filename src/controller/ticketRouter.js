const express = require("express");
const router = express.Router();
const ticketService = require("../service/ticketService");
const {
  authenticateToken,
  authenticateManagerToken,
} = require("../util/middleware");

router.get("/:user", authenticateToken, async (req, res) => {
  let paramUser = req.params.user;
  let data = await ticketService.getTickets(paramUser);
  res.status(200).json({
    message: "Tickets retrieved successfully",
    userTickets: data.Items,
  });
});

router.get("/", authenticateManagerToken, async (req, res) => {
  let ticketStatus = "Pending";
  let data = await ticketService.getPendingTickets(ticketStatus);
  console.log(data);
  res.status(200).json({
    message: "Tickets retrieved successfully",
    pendingTickets: data.Items,
  });
});

router.post("/create", authenticateToken, async (req, res) => {
  let data = await ticketService.postTicket(req.body);

  if (data) {
    res.status(201).json({ message: "A ticket was sucessfully created" });
  } else {
    res.status(400).json({
      message:
        "A ticket could not be created, make sure all fields are filled and try again",
      receivedData: data,
    });
  }
});

router.put("/approve", authenticateManagerToken, async (req, res) => {
  let queryId = req.query.ticket_id;
  let data = await ticketService.processTicket("Approve", queryId);

  if (data) {
    res.status(201).json({ message: "A ticket was sucessfully approved" });
  } else {
    res.status(400).json({
      message:
        "A ticket could not be processed, make sure all credentials are correct and try again",
      receivedData: data,
    });
  }
});

router.put("/deny", authenticateManagerToken, async (req, res) => {
  let queryId = req.query.ticket_id;
  let data = await ticketService.processTicket("Denied", queryId);

  if (data) {
    res.status(201).json({ message: "A ticket was sucessfully denied" });
  } else {
    res.status(400).json({
      message:
        "A ticket could not be processed, make sure all credentials are correct and try again",
      receivedData: data,
    });
  }
});

module.exports = router;
