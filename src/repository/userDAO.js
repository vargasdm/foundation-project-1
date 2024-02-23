const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const bcrypt = require("bcrypt");
const logger = require("../util/logger");
const { error } = require("winston");

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: fromIni({ profile: "default" }),
});

// getting document client
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "reimbursement_user_table";

async function createUser(user) {
  // spice added to hashed password
  const saltRounds = 10;

  // hashing password
  user.password = await bcrypt.hash(user.password, saltRounds);
  console.log(user.password);

  const command = new PutCommand({
    TableName,
    Item: user,
    ConditionExpression: "attribute_not_exists(username)",
  });
  try {
    const data = await documentClient.send(command);
    console.log(data);
    return data;
  } catch (error) {
    logger.error(error);
  }
}

async function getUserByUsername(user) {
  const getCommand = new GetCommand({
    TableName,
    Key: {
      username: user.username,
    },
  });
  try {
    const data = await documentClient.send(getCommand);

    console.log(data.Item.password);
    let dbPass = data.Item.password;

    console.log(user.password);
    let requestPass = user.password;

    if (await bcrypt.compare(requestPass, dbPass)) {
      console.log(data);
      return data;
    } else {
      logger.error(error);
      return null;
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  createUser,
  getUserByUsername,
};
