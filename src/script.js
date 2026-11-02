export function Ship(length) {
  return {
    length,
    hits: 0,
    hit() {
      this.hits += 1;
    },
    isSunk() {
      return this.hits >= this.length;
    },
  };
}

export function Gameboard() {
  const missedAttacks = [];
  const attacks = []; // Track all attacks made on the board
  const placedShips = [];

  return {
    get missedAttacks() {
      return missedAttacks;
    },
    get attacks() {
      return attacks;
    },

    placeShip(length, startCoord, direction = "horizontal") {
      const newShip = Ship(length);
      const coords = [];
      const [x, y] = startCoord;

      for (let i = 0; i < length; i++) {
        if (direction === "horizontal") {
          coords.push([x + i, y]);
        } else {
          coords.push([x, y + i]);
        }
      }
      placedShips.push({ ship: newShip, coords });
    },

    receiveAttack(coord) {
      attacks.push(coord); // Log that this coordinate was attacked
      let hitFound = false;

      for (const item of placedShips) {
        const match = item.coords.some(
          (c) => c[0] === coord[0] && c[1] === coord[1],
        );
        if (match) {
          item.ship.hit();
          hitFound = true;
          break;
        }
      }

      if (!hitFound) {
        missedAttacks.push(coord);
      }
    },

    allSunk() {
      return (
        placedShips.length > 0 &&
        placedShips.every((item) => item.ship.isSunk())
      );
    },
  };
}

export function Player(type = "real") {
  const gameboard = Gameboard();

  return {
    type,
    gameboard,

    attack(enemyBoard, coord) {
      if (type === "real") {
        if (!coord) return;
        enemyBoard.receiveAttack(coord);
      } else if (type === "computer") {
        // Generate unique random coordinates [0-9, 0-9] that haven't been attacked yet
        const attackedSet = new Set(
          enemyBoard.attacks.map((c) => `${c[0]},${c[1]}`),
        );

        let x, y, coordKey;
        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);
          coordKey = `${x},${y}`;
        } while (attackedSet.has(coordKey));

        enemyBoard.receiveAttack([x, y]);
        return [x, y];
      }
    },
  };
}

//controller
export function GameController() {
  const player1 = Player("real");
  const player2 = Player("computer"); // Can be changed to "real" for 2-player hotseat later

  let activePlayer = player1;
  let winner = null;

  function getCurrentPlayer() {
    return activePlayer;
  }

  function getOpponent() {
    return activePlayer === player1 ? player2 : player1;
  }

  function switchTurn() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  function playRound(coord) {
    if (winner) return; // Game is already over

    const attacker = activePlayer;
    const opponent = getOpponent();

    // 1. Current player attacks opponent's board
    attacker.attack(opponent.gameboard, coord);

    // 2. Check if opponent's ships are all sunk
    if (opponent.gameboard.allSunk()) {
      winner = attacker;
      return;
    }

    // 3. Switch turn
    switchTurn();

    // 4. If the new active player is a computer, make it attack automatically
    if (activePlayer.type === "computer" && !winner) {
      activePlayer.attack(player1.gameboard);

      if (player1.gameboard.allSunk()) {
        winner = activePlayer;
        return;
      }

      // Switch back to human player
      switchTurn();
    }
  }

  function getWinner() {
    return winner;
  }

  return {
    player1,
    player2,
    getCurrentPlayer,
    getOpponent,
    playRound,
    getWinner,
  };
}
