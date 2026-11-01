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

import { Ship, Gameboard } from "./script.js";

describe("Gameboard Factory", () => {
  test("can place a ship at specific coordinates and receive an attack", () => {
    const board = Gameboard();
    // Let's assume we place a ship of length 3 starting at coordinate [0, 0] horizontally
    board.placeShip(3, [0, 0], "horizontal");

    // Attack the coordinate where part of the ship is
    board.receiveAttack([0, 0]);

    // Check if the board registered the hit on that ship or space
    // (We will write the implementation next to support this structure)
    expect(board.attacks.length).toBe(1);
  });
});

test("records missed attacks correctly", () => {
  const board = Gameboard();
  board.receiveAttack([5, 5]);
  expect(board.missedAttacks).toEqual([[5, 5]]);
});

test("reports true when all ships are sunk", () => {
  const board = Gameboard();
  board.placeShip(1, [0, 0], "horizontal");
  board.receiveAttack([0, 0]);
  expect(board.allSunk()).toBe(true);
});
