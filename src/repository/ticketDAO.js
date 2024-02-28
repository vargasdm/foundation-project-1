const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const logger = require("../util/logger");

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: fromIni({ profile: "default" }),
});

// getting document client
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "reimbursement_ticket_table";

const userIndex = "user-index";

const pendingIndex = "status-index";

async function getTicketsByUser(paramUser) {
  const command = new QueryCommand({
    TableName,
    IndexName: userIndex,
    KeyConditionExpression: "#user = :user",
    ExpressionAttributeNames: {
      "#user": "user",
    },
    ExpressionAttributeValues: {
      ":user": paramUser,
    },
  });
  try {
    const data = await documentClient.send(command);
    console.log(data);
    return data;
  } catch (error) {
    logger.error(error);
  }
}

async function getTicketsByPending(status) {
  const command = new QueryCommand({
    TableName,
    IndexName: pendingIndex,
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": status,
    },
  });
  try {
    const data = await documentClient.send(command);
    console.log(data);
    return data;
  } catch (error) {
    logger.error(error);
  }
}

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
  } else if (status === "Denied") {
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
  getTicketsByUser,
  getTicketsByPending,
};
