const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const logger = require("../util/logger");
const { error } = require("winston");
const { query } = require("express");

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: fromIni({ profile: "default" }),
});

// getting document client
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "reimbursement_ticket_table";

async function createTicket(ticket) {
  const command = new PutCommand({
    TableName,
    Item: ticket,
  });
  try {
    const data = await documentClient.send(command);
    console.log(data);
    return data;
  } catch (error) {
    logger.error(error);
  }
}

async function updateTicket(status, queryId) {
  if (status === "Approve") {
    const command = new UpdateCommand({
      TableName,
      Key: { ticket_id: queryId },
      UpdateExpression: "set #status = :status",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: { ":status": "Approved" },
      ReturnValues: "ALL_NEW",
    });

    try {
      const data = await documentClient.send(command);
      console.log(data);
      return data;
    } catch (error) {
      logger.error(error);
    }
  } else if (status === "deny") {
    const command = new UpdateCommand({
      TableName,
      Key: { ticket_id: queryId },
      UpdateExpression: "set #status = :status",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: { ":status": "Denied" },
      ReturnValues: "ALL_NEW",
    });

    try {
      const data = await documentClient.send(command);
      return data;
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = {
  createTicket,
  updateTicket,
};
