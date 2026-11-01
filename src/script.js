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
