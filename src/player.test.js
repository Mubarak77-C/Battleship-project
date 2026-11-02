import { expect, test, describe } from "vitest";
import { Player, Gameboard } from "./script.js";

describe("Player Factory", () => {
  test("creates a player with a specified type and their own gameboard", () => {
    const player = Player("real");
    expect(player.type).toBe("real");
    expect(player.gameboard).toBeDefined();
  });

  test("real player can attack an enemy gameboard at a specific coordinate", () => {
    const player1 = Player("real");
    const player2 = Player("real");

    player1.attack(player2.gameboard, [2, 3]);
    expect(player2.gameboard.attacks).toContainEqual([2, 3]);
  });

  test("computer player can make a random attack on an enemy gameboard", () => {
    const computer = Player("computer");
    const enemyBoard = Gameboard();

    computer.attack(enemyBoard);
    expect(enemyBoard.attacks.length).toBe(1);
  });

  test("computer player never repeats attacks on already attacked coordinates", () => {
    const computer = Player("computer");
    const enemyBoard = Gameboard();

    // Simulate multiple computer attacks
    for (let i = 0; i < 30; i++) {
      computer.attack(enemyBoard);
    }

    // Verify all recorded attacks are unique coordinates
    const uniqueAttacks = new Set(
      enemyBoard.attacks.map((coord) => `${coord[0]},${coord[1]}`),
    );
    expect(uniqueAttacks.size).toBe(enemyBoard.attacks.length);
  });
});
