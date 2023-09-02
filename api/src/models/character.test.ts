import {
  beforeAll,
  afterAll,
  test,
  describe,
  expect,
  assert,
  afterEach,
} from "vitest";
import MongoTestServer from "../test-utils/mongoTestServer.js";
import Character from "./character.js";

const mongoTestServer = new MongoTestServer();

beforeAll(async () => {
  await mongoTestServer.connect();
});

afterEach(async () => {
  await mongoTestServer.deleteRecords();
});

afterAll(async () => {
  await mongoTestServer.close();
});

describe("CRUD operations for the characters of users", () => {
  test("user can add a character", async () => {
    const createResult = await Character.createCharacter(
      "user1",
      "character1",
      true
    );

    assert(createResult.ok);

    const allCharactersResult = await Character.getAllUserCharacters("user1");

    assert(allCharactersResult.ok);
    const { characters } = allCharactersResult.val;

    const characterExists =
      characters.find((character) => character.name === "character1") !==
      undefined;

    expect(characterExists).toBeTruthy();
  });

  test("no duplicate character names are allowed", async () => {
    const result1 = await Character.createCharacter(
      "user1",
      "character1",
      false
    );

    assert(result1.ok);

    const result2 = await Character.createCharacter(
      "user1",
      "character1",
      false
    );

    const result3 = await Character.createCharacter(
      "user2",
      "character1",
      false
    );

    expect(result2.ok).toBeFalsy(); // character1 name is already used by the same user
    expect(result3.ok).toBeFalsy(); // character1 name is already used by a different user
  });

  test("user can only have one main character", async () => {
    const result1 = await Character.createCharacter(
      "user1",
      "character1",
      true
    );
    const result2 = await Character.createCharacter(
      "user1",
      "character2",
      true
    );

    const result3 = await Character.createCharacter(
      "user2",
      "character3",
      true
    );

    expect(result1.ok).toBeTruthy();
    expect(result2.ok).toBeFalsy(); // character1 is already a main character
    expect(result3.ok).toBeTruthy(); // this is fine because user2 has no main character
  });

  test("user can delete their character", async () => {
    (await Character.createCharacter("user1", "character1", false)).unwrap();
    (await Character.createCharacter("user1", "character2", false)).unwrap();
    (await Character.createCharacter("user1", "character3", false)).unwrap();
    (await Character.createCharacter("user2", "character123", false)).unwrap();

    const deleteNonExistingResult = await Character.deleteCharacter(
      "user1",
      "character42069"
    );

    const deleteOtherUserCharacterResult = await Character.deleteCharacter(
      "user1",
      "character123"
    );

    expect(deleteNonExistingResult.ok).toBeFalsy(); // character does not exist
    expect(deleteOtherUserCharacterResult.ok).toBeFalsy(); // cannot delete character that belongs to a different user

    const deleteThirdCharacterResult = await Character.deleteCharacter(
      "user1",
      "character3"
    );

    expect(deleteThirdCharacterResult.ok).toBeTruthy();

    const firstUserCharactersResult = await Character.getAllUserCharacters(
      "user1"
    );

    assert(firstUserCharactersResult.ok);

    const firstUserCharacters = firstUserCharactersResult.val.characters;

    expect(firstUserCharacters.length).toBe(2); // first and second characters remain
  });

  test("user can update an existing character", async () => {
    const character1 = (
      await Character.createCharacter("user1", "character1", false)
    ).unwrap().character;

    const mutatedCharacter1 = {
      ...character1,
      main: true,
      division: "Mining",
      rank: "Journeyman Technician",
    };

    const updatedCharacter1 = (
      await Character.replaceCharacter("user1", "character1", mutatedCharacter1)
    ).unwrap().character;

    expect(updatedCharacter1.division).toEqual("Mining");
    expect(updatedCharacter1.rank).toEqual("Journeyman Technician");
  });

  test("user cannot have more than one main character", async () => {
    const character1 = (
      await Character.createCharacter("user1", "character1", false)
    ).unwrap().character;

    const character2 = (
      await Character.createCharacter("user1", "character2", true)
    ).unwrap().character;

    const updateCharacter1Result = await Character.replaceCharacter(
      "user1",
      "character1",
      { ...character1, main: true }
    );

    expect(updateCharacter1Result.ok).toBeFalsy(); // character2 is a main character

    // now no character is a main character
    Character.replaceCharacter("user1", "character2", {
      ...character2,
      main: false,
    });

    const updateCharacter2Result = await Character.replaceCharacter(
      "user1",
      "character2",
      { ...character2, main: true }
    );

    expect(updateCharacter2Result.ok).toBeTruthy();
  });
});
