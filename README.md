# 🚢 Battleship Game (Vanilla JavaScript & Vite)

A fully tested, object-oriented, turn-based **Battleship** game built from scratch using **Test-Driven Development (TDD)** with **Vitest**, bundled with **Vite**, and styled with clean, modular CSS.
live link : https://mubarak77-c.github.io/Battleship-project/

---

## 🚀 Project Overview & Engineering Philosophy

This project was built to practice strict **separation of concerns** and **Domain-Driven Design (DDD)**. Instead of mixing UI and game logic, the core game engine is completely decoupled ("headless") and testable in isolation, with the DOM acting purely as a real-time reactive view layer.

### Core Architecture
* **Headless Game Engine:** Pure JavaScript modules managing state (`Ship`, `Gameboard`, `Player`, and `GameController`).
* **Test-Driven Development (TDD):** All core business logic and AI behaviors were written and verified using unit tests in **Vitest** before connecting to the UI.
* **Smart Computer AI:** Features custom tracking logic utilizing JavaScript `Set` data structures to guarantee zero duplicate attacks during computer turns.
* **Reactive UI Layer:** Powered by **Vite**, translating state changes into dynamic grid rendering (Fog of War, hit/miss tracking, and win condition triggers).

---

## 🛠️ Tech Stack
* **Language:** JavaScript (ES6 Modules)
* **Build Tool:** Vite
* **Testing Framework:** Vitest
* **Styling:** CSS Grid & Flexbox

---

## 🧠 System Architecture & Modules

```text
src/
├── script.js            # Core Game Engine (Ship, Gameboard, Player, GameController)
├── script.test.js       # TDD Unit Tests for Engine Logic
├── main.js              # DOM Controller & Event Listeners (UI Layer)
├── style.css            # Game Grid & Layout Styling
└── index.html           # Application Markup Entry Point

🧪 Running Tests

To run the Vitest unit test suite and verify all engine logic:
# Install dependencies
npm install

# Run tests in watch mode
npm run test

🖥️ Running the Application Locally

To spin up the local Vite development server:
# Run the local dev server
npm run dev
