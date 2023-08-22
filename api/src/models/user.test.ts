import {
  beforeAll,
  beforeEach,
  afterAll,
  test,
  describe,
  expect,
} from "vitest";
import User from "./user.js";
import MongoTestServer from "../test-utils/mongoTestServer.js";

const mongoTestServer = new MongoTestServer();

beforeAll(() => {
  mongoTestServer.connect();
});

beforeEach(() => {
  mongoTestServer.dropCollections();
});

afterAll(() => {
  mongoTestServer.drop();
});

describe("authentication", () => {
  test("users can create accounts if username is not in use", async () => {
    const firstResult = await User.register("first user", "password");
    const secondResult = await User.register("first user", "password");
    const thirdResult = await User.register("second user", "password");
    expect(firstResult.ok).toBeTruthy();
    expect(secondResult.ok).toBeFalsy(); // username is taken
    expect(thirdResult.ok).toBeTruthy(); // username is available
  });

  test("user can be found after creation", async () => {
    await User.register("first user", "password");

    const existingUser = await User.findByUsername("first user");
    const nonExistingUser = await User.findByUsername("second user");
    expect(existingUser).not.toBeNull();
    expect(nonExistingUser).toBeNull();
  });

  test("user can log in with correct credentials", async () => {
    await User.register("correct username", "correct password");

    const wrongUsernameResult = await User.login(
      "wrong username",
      "correct password"
    );
    expect(wrongUsernameResult.ok).toBeFalsy();

    const wrongPasswordResult = await User.login(
      "correct username",
      "wrong password"
    );
    expect(wrongPasswordResult.ok).toBeFalsy();

    const correctCredentialsResult = await User.login(
      "correct username",
      "correct password"
    );
    expect(correctCredentialsResult.ok).toBeTruthy();
  });
});
