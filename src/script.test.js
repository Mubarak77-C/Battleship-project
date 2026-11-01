import { expect, test, describe } from "vitest";
import { Ship } from "./script.js";

describe("Ship Factory", () => {
  test("creates a ship with correct length and 0 hits", () => {
    const myShip = Ship(3);
    expect(myShip.length).toBe(3);
    expect(myShip.hits).toBe(0);
  });

  test("hit() function increments the number of hits", () => {
    const myShip = Ship(3);
    myShip.hit();
    expect(myShip.hits).toBe(1);
  });

  test("isSunk() returns true if hits match length", () => {
    const myShip = Ship(2);
    myShip.hit();
    expect(myShip.isSunk()).toBe(false);
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
  });
});
