import { expect, test } from "vitest";
import { Ship } from "./script.js";

test("Ship factory creates a ship with the correct length and 0 hits", () => {
  const myShip = Ship(3);
  expect(myShip.length).toBe(3);
  expect(myShip.hits).toBe(0);
});
