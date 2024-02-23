const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const logger = require("../util/logger");
const { error } = require("winston");

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
module.exports = {
  createTicket,
}