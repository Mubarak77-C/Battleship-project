import { GameController } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  let game = GameController();

  // For testing/playable flow: place a couple of ships on both boards automatically
  game.player1.gameboard.placeShip(3, [0, 0], "horizontal");
  game.player1.gameboard.placeShip(2, [5, 5], "vertical");

  game.player2.gameboard.placeShip(3, [2, 2], "vertical");
  game.player2.gameboard.placeShip(4, [6, 1], "horizontal");

  const playerBoardEl = document.getElementById("player-board");
  const computerBoardEl = document.getElementById("computer-board");
  const statusEl = document.getElementById("game-status");
  const restartBtn = document.getElementById("restart-btn");

  function renderBoards() {
    playerBoardEl.innerHTML = "";
    computerBoardEl.innerHTML = "";

    const p1Board = game.player1.gameboard;
    const p2Board = game.player2.gameboard;

    // Render Player 1 Grid (Own board - shows ships and attacks received)
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Check if cell has been attacked
        const isHit = p1Board.attacks.some((c) => c[0] === x && c[1] === y);
        const isMiss = p1Board.missedAttacks.some(
          (c) => c[0] === x && c[1] === y,
        );

        // Optional: Check if a ship is located here
        const hasShip = p1Board.placedShips?.some((item) =>
          item.coords.some((c) => c[0] === x && c[1] === y),
        );

        if (isHit) cell.classList.add("hit");
        else if (isMiss) cell.classList.add("miss");
        else if (hasShip) cell.classList.add("ship"); // Reveal player's ships

        playerBoardEl.appendChild(cell);
      }
    }

    // Render Computer Grid (Enemy board - clickable for attacks)
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const isHit = p2Board.attacks.some((c) => c[0] === x && c[1] === y);
        const isMiss = p2Board.missedAttacks.some(
          (c) => c[0] === x && c[1] === y,
        );

        if (isHit) {
          cell.classList.add("hit");
        } else if (isMiss) {
          cell.classList.add("miss");
        } else {
          // Only add click listener to unattacked cells on opponent board
          cell.addEventListener("click", () => handleCellClick(x, y));
        }

        computerBoardEl.appendChild(cell);
      }
    }
  }

  function handleCellClick(x, y) {
    if (game.getWinner()) return;

    // Execute round via GameController engine
    game.playRound([x, y]);

    // Check win conditions
    const winner = game.getWinner();
    if (winner) {
      statusEl.textContent =
        winner === game.player1 ? "You Win!" : "Computer Wins!";
      restartBtn.style.display = "inline-block";
    } else {
      statusEl.textContent = "Your Turn";
    }

    renderBoards();
  }

  restartBtn.addEventListener("click", () => {
    game = GameController();
    // Re-place ships for a fresh game
    game.player1.gameboard.placeShip(3, [0, 0], "horizontal");
    game.player2.gameboard.placeShip(3, [2, 2], "vertical");
    restartBtn.style.display = "none";
    statusEl.textContent = "New Game Started. Your Turn!";
    renderBoards();
  });

  // Initial render on load
  renderBoards();
});
