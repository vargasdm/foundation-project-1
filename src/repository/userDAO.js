const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const { validatePassword } = require("../util/encrypt");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const logger = require("../util/logger");
const bcrypt = require("bcrypt");
const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: fromIni({ profile: "default" }),
});

// getting document client
const documentClient = DynamoDBDocumentClient.from(client);

// db table name variable
const TableName = "reimbursement_user_table";

// creating user item
async function createUser(user) {
  // spice added to hashed password
  const saltRounds = 10;

  // hashing password
  user.password = await bcrypt.hash(user.password, saltRounds);

  const command = new PutCommand({
    TableName,
    Item: user,
    // checks to see if username already exists
    ConditionExpression: "attribute_not_exists(username)",
  });
  try {
    const data = await documentClient.send(command);
    return data;
  } catch (error) {
    logger.error(error);
  }
}

// get user item by username partition key
async function getUserByUsername(user) {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "#username = :username",
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": user.username,
    },
  });
  try {
    const data = await documentClient.send(command);
    console.log(data);
    let dbPass = data.Items[0].password;
    let requestPass = user.password;

    if (await validatePassword(requestPass, dbPass)) {
      return data;
    }
  } catch (error) {
    logger.error(error);
    return null;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
};
