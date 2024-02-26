// endpoint: /tickets
// CRUD
const express = require("express");
const router = express.Router();
const ticketService = require("../service/ticketService");
const {
  authenticateToken,
  authenticateManagerToken,
} = require("../util/middleware");

router.post("/create", authenticateToken, async (req, res) => {
  let data = await ticketService.postTicket(req.body);

  if (data) {
    res.status(201).json({ message: "A ticket was sucessfully created", data });
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
    res
      .status(201)
      .json({ message: "A ticket was sucessfully approved", data });
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
  let data = await ticketService.processTicket("Approve", queryId);

  if (data) {
    res
      .status(201)
      .json({ message: "A ticket was sucessfully denied", data });
  } else {
    res.status(400).json({
      message:
        "A ticket could not be processed, make sure all credentials are correct and try again",
      receivedData: data,
    });
  }
});

module.exports = router;
