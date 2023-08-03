import { MongoMemoryServer } from "mongodb-memory-server";
import type { MongoMemoryServer as MongoServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";
import {
  beforeAll,
  beforeEach,
  afterAll,
  test,
  describe,
  expect,
} from "vitest";
import User from "./user.js";

let mongoServer: MongoServer;

const connectDb = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connect(uri);
};

const dropCollections = async () => {
  if (mongoServer) {
    const collections = await connection.db.collections();
    for (let collection of collections) {
      await collection.drop();
    }
  }
};

const dropDb = async () => {
  if (mongoServer) {
    await connection.dropDatabase();
    await connection.close();
    await mongoServer.stop();
  }
};

beforeAll(() => {
  connectDb();
});

beforeEach(() => {
  dropCollections();
});

afterAll(() => {
  dropDb();
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
