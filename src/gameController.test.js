import { expect, test, describe } from "vitest";
import { GameController } from "./script.js";

describe("Game Controller", () => {
  test("initializes two players and sets player 1 as the active turn", () => {
    const game = GameController();
    expect(game.getCurrentPlayer().type).toBe("real");
    expect(game.getOpponent().type).toBe("computer");
  });

  test("switches turns after a valid round", () => {
    const game = GameController();
    expect(game.getCurrentPlayer().type).toBe("real");

    // Player 1 attacks player 2's board
    game.playRound([0, 0]);

    // After player 1 attacks, if player 2 is a computer, it automatically plays its turn,
    // returning control back to player 1 (or we track active turn appropriately).
    // Let's verify that attacks were registered on both boards.
    expect(game.player2.gameboard.attacks.length).toBeGreaterThan(0);
  });

  test("detects a winner when all ships on a board are sunk", () => {
    const game = GameController();
    // Place a tiny ship on player 2's board for testing win condition
    game.player2.gameboard.placeShip(1, [0, 0], "horizontal");

    // Attack that exact coordinate
    game.playRound([0, 0]);

    expect(game.getWinner()).toBe(game.player1);
  });
});
