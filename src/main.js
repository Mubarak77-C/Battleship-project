import { GameController } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  let game = GameController();

  // 1. Place ships for Player 1 (Your board)
  game.player1.gameboard.placeShip(3, [0, 0], "horizontal");
  game.player1.gameboard.placeShip(2, [5, 5], "vertical");

  // 2. Place ships for Player 2 (Computer board)
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

    // ==========================================
    // RENDER PLAYER 1 BOARD (YOUR BOARD)
    // ==========================================
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const isMiss = p1Board.missedAttacks.some(
          (c) => c[0] === x && c[1] === y,
        );
        // It's a hit if it was attacked, but NOT in missedAttacks
        const isHit =
          p1Board.attacks.some((c) => c[0] === x && c[1] === y) && !isMiss;

        const hasShip = p1Board.placedShips?.some((item) =>
          item.coords.some((c) => c[0] === x && c[1] === y),
        );

        if (isHit) {
          cell.classList.add("hit");
        } else if (isMiss) {
          cell.classList.add("miss");
        } else if (hasShip) {
          cell.classList.add("ship"); // Shows your ship positions
        }

        playerBoardEl.appendChild(cell);
      }
    }

    // ==========================================
    // RENDER COMPUTER BOARD (ENEMY BOARD)
    // ==========================================
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const isMiss =
          p2Board.missedStatacks ||
          p2Board.missedAttacks.some((c) => c[0] === x && c[1] === y);
        const isHit =
          p2Board.attacks.some((c) => c[0] === x && c[1] === y) && !isMiss;

        if (isHit) {
          cell.classList.add("hit");
        } else if (isMiss) {
          cell.classList.add("miss");
        } else {
          // ONLY unattacked cells on the computer board are clickable by you!
          const alreadyAttacked = p2Board.attacks.some(
            (c) => c[0] === x && c[1] === y,
          );
          if (!alreadyAttacked) {
            cell.addEventListener("click", () => handleCellClick(x, y));
          }
        }

        computerBoardEl.appendChild(cell);
      }
    }
  }

  function handleCellClick(x, y) {
    if (game.getWinner()) return;

    // Your attack triggers, followed instantly by computer AI counter-attack
    game.playRound([x, y]);

    const winner = game.getWinner();
    if (winner) {
      statusEl.textContent =
        winner === game.player1 ? "🎉 You Win!" : "🤖 Computer Wins!";
      restartBtn.style.display = "inline-block";
    } else {
      statusEl.textContent = "Your Turn (Click Computer Board)";
    }

    renderBoards();
  }

  restartBtn.addEventListener("click", () => {
    game = GameController();
    game.player1.gameboard.placeShip(3, [0, 0], "horizontal");
    game.player2.gameboard.placeShip(3, [2, 2], "vertical");
    restartBtn.style.display = "none";
    statusEl.textContent = "New Game Started. Your Turn!";
    renderBoards();
  });

  renderBoards();
});
