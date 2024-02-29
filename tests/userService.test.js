const {
  postUser,
  loginUser,
  validateResponseCredentials,
} = require("../src/service/userService.js");
const encrypt = require("../src/util/encrypt.js");
const userDao = require("../src/repository/userDAO");
const uuid = require("uuid");

describe("Registering User Tests", () => {
  //
  test("should return data sucessfully", async () => {
    const receivedData = {
      username: "fakeusername",
      password: "pass",
      role: "manager",
    };

    const mockedId = uuid.v4();

    // mocks a fake database response
    jest.spyOn(userDao, "getUserByUsername").mockReturnValueOnce({
      Items: [],
    });

    // mocks creatUser function return value
    jest.spyOn(userDao, "createUser").mockReturnValueOnce({
      Items: [
        {
          username: "fakeusername",
          password: "pass",
          id: mockedId,
          role: "manager",
        },
      ],
    });

    const result = await userDao.createUser(receivedData);
    const expected = {
      Items: [
        {
          username: "fakeusername",
          password: "pass",
          id: mockedId,
          role: "manager",
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  test("should return data sucessfully with employee role", async () => {
    const receivedData = {
      username: "fakeusername",
      password: "pass",
    };

    const mockedId = uuid.v4();

    jest.spyOn(userDao, "getUserByUsername").mockReturnValueOnce({
      Items: [],
    });

    jest.spyOn(userDao, "createUser").mockReturnValueOnce({
      Items: [
        {
          username: "fakeusername",
          password: "pass",
          id: mockedId,
          role: "employee",
        },
      ],
    });

    const result = await userDao.createUser(receivedData);
    const expected = {
      Items: [
        {
          username: "fakeusername",
          password: "pass",
          id: mockedId,
          role: "employee",
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  test("should return The conditional request failed", async () => {
    const receivedData = {
      username: "fakeusername",
      password: "pass",
      role: "manager",
    };

    jest.spyOn(userDao, "getUserByUsername").mockReturnValueOnce({
      Items: [{ username: "fakeusername", password: "pass", role: "manager" }],
    });

    jest
      .spyOn(userDao, "createUser")
      .mockReturnValueOnce("The conditional request failed");

    const result = await userDao.createUser(receivedData);
    const expected = "The conditional request failed";

    expect(result).toBe(expected);
  });

  test("should return null due to missing required fields", async () => {
    const receivedData = {
      username: "fakeusername",
      password: "",
      role: "manager",
    };

    const result = await postUser(receivedData);
    const expected = null;

    expect(result).toBe(expected);
  });
});

// this test doesn't work
describe("login Tests", () => {
  test("should return data successfully", async () => {
    let mockedId = uuid.v4();

    const receivedData = {
      username: "fakeusername",
      password: "pass",
    };

    jest.spyOn(encrypt, "validatePassword").mockResolvedValue(true);

    jest.spyOn(userDao, "getUserByUsername").mockReturnValueOnce({
      Items: [
        {
          username: "fakeusername",
          password: "pass",
          role: "employee",
          id: mockedId,
        },
      ],
    });

    console.log(await loginUser(receivedData));

    const result = await loginUser(receivedData);
    const expected = {
      Items: [
        {
          username: "fakeusername",
          password: "pass",
          role: "employee",
          id: mockedId,
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});

describe("validateResponseCredentials Tests", () => {
  test("should return false due to missing username", () => {
    const receivedData = {
      username: "",
      password: "pass",
    };

    const result = validateResponseCredentials(receivedData);
    const expected = false;

    expect(result).toBe(expected);
  });

  test("should return false due to missing password", () => {
    const receivedData = {
      username: "fakeusername",
      password: "",
    };

    const result = validateResponseCredentials(receivedData);
    const expected = false;

    expect(result).toBe(expected);
  });
});
