const {
  getTickets,
  getPendingTickets,
  postTicket,
  processTicket,
  validateTicketData,
} = require("../src/service/ticketService");
const ticketDao = require("../src/repository/ticketDAO");
const uuid = require("uuid");

describe("creating ticket Tests", () => {
  test("should return data successfully", async () => {
    const receivedData = {
      user: "fakeuser",
      description: "fakedescription",
      amount: 1000,
    };

    let mockedTicketId = uuid.v4();

    jest.spyOn(ticketDao, "createTicket").mockReturnValueOnce({
      Items: [
        {
          ticket_id: mockedTicketId,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Pending",
        },
      ],
    });

    const result = await postTicket(receivedData);
    const expected = {
      Items: [
        {
          ticket_id: mockedTicketId,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Pending",
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});

describe("get tickets Tests", () => {
  test("should return data successfully", async () => {
    const mockedUser = "fakeuser";
    let mockedTicketId1 = uuid.v4();
    let mockedTicketId2 = uuid.v4();

    jest.spyOn(ticketDao, "getTicketsByUser").mockReturnValueOnce({
      Items: [
        {
          ticket_id: mockedTicketId1,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Pending",
        },
        {
          ticket_id: mockedTicketId2,
          user: "fakeuser",
          description: "fakedescription2",
          amount: 100,
          status: "Approved",
        },
      ],
    });

    const result = await getTickets(mockedUser);
    const expected = {
      Items: [
        {
          ticket_id: mockedTicketId1,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Pending",
        },
        {
          ticket_id: mockedTicketId2,
          user: "fakeuser",
          description: "fakedescription2",
          amount: 100,
          status: "Approved",
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});

describe("validateTicketData Tests", () => {
  test("should return false due to no amount value", () => {
    const receivedData = {
      user: "fakeuser",
      description: "fakedescription",
    };

    const result = validateTicketData(receivedData);
    const expected = false;

    expect(result).toBe(expected);
  });

  test("should return false due to no user value", () => {
    const receivedData = {
      description: "fakedescription",
      amount: 1000,
    };
    const result = validateTicketData(receivedData);
    const expected = false;

    expect(result).toBe(expected);
  });

  test("should return false due to no description value", () => {
    const receivedData = {
      user: "fakeuser",
      amount: 1000,
    };

    const result = validateTicketData(receivedData);
    const expected = false;

    expect(result).toBe(expected);
  });

  test("should return true due to all fields filled", () => {
    const receivedData = {
      user: "fakeuser",
      description: "fakedescription",
      amount: 1000,
    };

    const result = validateTicketData(receivedData);
    const expected = true;

    expect(result).toBe(expected);
  });
});

describe("getPendingTickets Tests", () => {
  test("should return data successfully", async () => {
    const mockedStatus = "Pending";
    let mockedTicketId1 = uuid.v4();
    let mockedTicketId2 = uuid.v4();

    jest.spyOn(ticketDao, "getTicketsByPending").mockReturnValueOnce({
      Items: [
        {
          ticket_id: mockedTicketId1,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Pending",
        },
        {
          ticket_id: mockedTicketId2,
          user: "fakeuser",
          description: "fakedescription2",
          amount: 100,
          status: "Pending",
        },
      ],
    });

    const result = await getPendingTickets(mockedStatus);
    const expected = {
      Items: [
        {
          ticket_id: mockedTicketId1,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Pending",
        },
        {
          ticket_id: mockedTicketId2,
          user: "fakeuser",
          description: "fakedescription2",
          amount: 100,
          status: "Pending",
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});

describe("processTicket Tests", () => {
  test("should return data with status approved", async () => {
    const mockedStatus = "Approve";
    let mockedQueryId = uuid.v4();

    jest.spyOn(ticketDao, "updateTicket").mockReturnValueOnce({
      Items: [
        {
          ticket_id: mockedQueryId,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Approved",
        },
      ],
    });

    const result = await processTicket(mockedStatus, mockedQueryId);
    const expected = {
      Items: [
        {
          ticket_id: mockedQueryId,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Approved",
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  test("should return data with status denied", async () => {
    const mockedStatus = "Deny";
    let mockedQueryId = uuid.v4();

    jest.spyOn(ticketDao, "updateTicket").mockReturnValueOnce({
      Items: [
        {
          ticket_id: mockedQueryId,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Approved",
        },
      ],
    });

    const result = await processTicket(mockedStatus, mockedQueryId);
    const expected = {
      Items: [
        {
          ticket_id: mockedQueryId,
          user: "fakeuser",
          description: "fakedescription",
          amount: 1000,
          status: "Approved",
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});
