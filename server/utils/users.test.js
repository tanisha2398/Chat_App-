const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "mike",
        room: "pop star"
      },
      {
        id: "2",
        name: "nike",
        room: "lock star"
      },
      {
        id: "3",
        name: "bike",
        room: "pop star"
      }
    ];
  });

  it("should add user", () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Tanisha",
      room: "pop star"
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  it("should remove user", () => {
    var userId = "1";
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it("should not remove user", () => {
    var userId = "99";
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  it("should find user", () => {
    var userId = "1";
    var user = users.getUser(userId);
    expect(user.id).toEqual(userId);
  });
  it("should not find user", () => {
    var userId = "9";
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
  it("should return names in pop star", () => {
    var userList = users.getUserList("pop star");
    expect(userList).toEqual(["mike", "bike"]);
  });
  it("should return names in lock star", () => {
    var userList = users.getUserList("lock star");
    expect(userList).toEqual(["nike"]);
  });
});
