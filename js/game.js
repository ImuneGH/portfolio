import * as focusTrap from "focus-trap";

//*******************
// functions
//*******************

function gameStart() {
  if (!activeMiniGame) {
    createGame.remove();
    clearTimeout(timeoutCloseWindow);
    gameMenu();
    createGame.classList.remove(
      "animate__animated",
      "animate__zoomOut",
      "animate__faster",
    );
    createGame.classList.add(
      "animate__animated",
      "animate__zoomIn",
      "animate__faster",
    );
  } else {
    if (activeMiniGame) {
      createGame.classList.remove(
        "animate__animated",
        "animate__zoomIn",
        "animate__faster",
      );
      createGame.classList.add(
        "animate__animated",
        "animate__zoomOut",
        "animate__faster",
      );
      timeoutCloseWindow = setTimeout(() => {
        createGame.remove();
      }, 300);
      activeMiniGame = false;
    }
  }
}

function gameMenu() {
  createGame.innerHTML = `<form action="" class="box">

                                <h1>Catch the SQUARE game</h1>

                                <div class="container">

                                    <input class="mini-game-button" type="radio" name="difficulty" id="easy" checked><label for="easy">easy</label>
                                    <input class="mini-game-button" type="radio" name="difficulty" id="medium"><label for="medium">medium</label>
                                    <input class="mini-game-button" type="radio" name="difficulty" id="hard"><label for="hard">hard</label>

                                </div>

                                <button class="button" id="start">START</button>
                                <button class="button" id="exit">EXIT</button>

                            </form>`;
  createGame.style.width = "320px";
  createGame.style.height = "0";
  createGame.style.margin = "-160px";
  createGame.classList.add("cover");
  body.appendChild(createGame);
  activeMiniGame = true;
  const startButton = document.getElementById("start");
  const exittButton = document.getElementById("exit");
  startWindow = document.querySelector(".box");
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    start();
  });
  exittButton.addEventListener("click", (event) => {
    event.preventDefault();
    exit();
  });
}

function responsiveGameWindow() {
  if (window.innerWidth > 750) {
    gameBox.style.width = "600px";
    gameBox.style.height = "600px";
    createGame.style.width = "600px";
    createGame.style.height = "600px";
    createGame.style.margin = "-300px";
    positionX = 580;
    positionY = 550;
  } else if (window.innerWidth <= 750 && window.innerWidth > 500) {
    gameBox.style.width = "450px";
    gameBox.style.height = "450px";
    createGame.style.width = "450px";
    createGame.style.height = "450px";
    createGame.style.margin = "-225px";
    positionX = 428;
    positionY = 400;
  } else {
    gameBox.style.width = "300px";
    gameBox.style.height = "300px";
    createGame.style.width = "300px";
    createGame.style.height = "300px";
    createGame.style.margin = "-150px";
    positionX = 280;
    positionY = 250;
  }
}

function start() {
  const difficulty = document.querySelector('input[name="difficulty"]:checked');
  startWindow.remove();
  difficultyChoice(difficulty.id);
  createNewGame();
  createNewSquare();
}

function difficultyChoice(difficulty) {
  switch (difficulty) {
    case "easy":
      difficultySpeed = 15;
      break;
    case "medium":
      difficultySpeed = 10;
      break;
    case "hard":
      difficultySpeed = 5;
      break;
  }
}

function createNewGame() {
  scoreBoard.textContent = `Your Score is: ${score}`;
  responsiveGameWindow();
  createGame.appendChild(gameBox);
  gameBox.appendChild(scoreBoard);
  trap.activate();
}

function createNewSquare() {
  if (gameBox.contains(dot)) {
    gameBox.removeChild(dot);
  }
  score++;
  scoreBoard.textContent = `Your Score is: ${score}`;
  setTimeout(() => {
    let topPosition = Math.floor(Math.random() * positionY);
    let leftPosition = Math.floor(Math.random() * positionX);
    dot.style.top = `${topPosition}px`;
    dot.style.left = `${leftPosition}px`;
    gameBox.appendChild(dot);
    dotFall(topPosition);
  }, 1000);
}

function dotFall(topPosition) {
  if (gameBox.contains(dot)) {
    if (topPosition <= positionY + 30) {
      setTimeout(() => {
        topPosition += 0.5;
        dot.style.top = `${topPosition}px`;
        dotFall(topPosition);
      }, difficultySpeed);
    } else {
      gameOver();
    }
  }
}

function gameOver() {
  if (gameBox.contains(dot)) {
    gameBox.removeChild(dot);
  }
  trap.deactivate();

  gameBox.appendChild(gameOverForm);
  const gameOverButtons = document.querySelectorAll(".game-over-button");
  gameOverButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (button.textContent === "RESET") {
        gameOverForm.remove();
        score = -1;
        createGame.classList.remove(
          "animate__animated",
          "animate__zoomIn",
          "animate__faster",
        );
        gameMenu();
      } else {
        exit();
      }
    });
  });
}
function exit() {
  if (gameBox.contains(dot)) {
    gameBox.removeChild(dot);
  }
  gameOverForm.remove();
  createGame.remove();
  activeMiniGame = false;
  score = -1;
}

//*******************
// main program
//*******************

const gameOverForm = document.createElement("form");
const body = document.querySelector("body");
const desktopStart = document.getElementById("desktop-game-start");
const responsiveStart = document.getElementById("resp-game-start");
let activeDesktop = false;
let activeMiniGame = false;
const createGame = document.createElement("div");
const gameBox = document.createElement("div");
let score = -1;
let scoreBoard = document.createElement("p");
let dot = document.createElement("img");
let difficultySpeed;
let startWindow;
let positionX;
let positionY;
let timeoutCloseWindow;
const trap = focusTrap.createFocusTrap(createGame, {
  onPostActivate: () =>
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        exit();
      }
    }),
});

gameBox.classList.add("new-game");
gameBox.setAttribute("tabindex", "0");
dot.src = "./img/dot.jpg";
dot.classList.add("dot");
gameOverForm.innerHTML = `<button class="game-over-button">RESET</button>
                          <button class="game-over-button">EXIT</button>`;
gameOverForm.classList.add("game-over-form");

if (window.innerWidth > 850) {
  desktopStart.addEventListener("click", gameStart);
  activeDesktop = true;
} else {
  responsiveStart.addEventListener("click", gameStart);
  activeDesktop = false;
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    if (!activeDesktop) {
      responsiveStart.removeEventListener("click", gameStart);
      desktopStart.addEventListener("click", gameStart);
      activeDesktop = true;
    }
  } else {
    if (activeDesktop) {
      desktopStart.removeEventListener("click", gameStart);
      responsiveStart.addEventListener("click", gameStart);
      activeDesktop = false;
    }
  }
});

dot.addEventListener("click", createNewSquare);
