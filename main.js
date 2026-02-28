let countPlayers = 2;
let playersCards = [];
let currentPlayer = 1;

const setupBlock = document.querySelector("#setup");
const gameContainer = document.querySelector("#game-container");
const startBtn = document.querySelector("#startBtn");
const playersInput = document.querySelector("#playersInput");
const cardsEl = document.querySelector("#cards");
const playerEl = document.querySelector("#player");
const choiceEl = document.querySelector("#choice");
const winblockEl = document.querySelector("#winblock");

startBtn.addEventListener("click", initGame);

function initGame() {
  currentPlayer = 1;

  if (playersInput.value > 1 && playersInput.value < 33) {
    countPlayers = parseInt(playersInput.value);
    playersCards = [];
    for (let i = 0; i < countPlayers; i++) {
      playersCards.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    setupBlock.style.display = "none";
    gameContainer.style.display = "block";

    renderCards();
    renderTurn();
  } else {
    alert("Number of players should >=1 and <=32");
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === countPlayers ? 1 : currentPlayer + 1;
  renderCards();
  renderTurn();
}

function removeCards(cardsToRemove) {
  playersCards[currentPlayer - 1] = playersCards[currentPlayer - 1].filter(
    (card) => !cardsToRemove.includes(card),
  );
  if (checkWin()) {
    restartGame();
    renderCards();
    return;
  }

  switchPlayer();
}

function renderTurn() {
  playerEl.innerHTML = `<h3>Now turn of player: ${currentPlayer}</h3>`;

  choiceEl.innerHTML = "";

  let rollBtn = document.createElement("button");
  rollBtn.style.marginTop = "20px";
  rollBtn.style.padding = "20px";
  rollBtn.innerText = "Roll Dice";

  rollBtn.addEventListener("click", () => {
    let d1 = rollDice();
    let d2 = rollDice();
    renderActionButtons(d1, d2);
  });

  choiceEl.appendChild(rollBtn);
}

function renderActionButtons(d1, d2) {
  choiceEl.innerHTML = "";

  let resultText = document.createElement("div");
  resultText.style.marginBottom = "15px";
  resultText.innerHTML = `<h3>Dices: ${d1} и ${d2}</h3>`;
  choiceEl.appendChild(resultText);

  let buttonsContainer = document.createElement("div");

  let b1 = document.createElement("button");
  b1.innerText = `${d1} , ${d2}`;

  let b2 = document.createElement("button");
  b2.innerText = d1 + d2;

  let skipbtn = document.createElement("button");
  skipbtn.innerText = "Skip";

  updateButtonsState(d1, d2, b1, b2);

  b1.addEventListener("click", () => removeCards([d1, d2]));
  b2.addEventListener("click", () => removeCards([d1 + d2]));
  skipbtn.addEventListener("click", () => {
    switchPlayer();
  });

  buttonsContainer.appendChild(b1);
  buttonsContainer.appendChild(b2);
  buttonsContainer.appendChild(skipbtn);

  choiceEl.appendChild(buttonsContainer);
}

function renderCards() {
  cardsEl.innerHTML = "";

  for (let p = 0; p < countPlayers; p++) {
    let playercardsblock = document.createElement("div");
    playercardsblock.innerHTML = `<h3>Player №${p + 1}</h3>`;
    cardsEl.appendChild(playercardsblock);

    if (p + 1 === currentPlayer) {
      playercardsblock.style.border = "3px solid #ffaa00";
      playercardsblock.style.borderRadius = "5px";
    }

    for (let i = 1; i <= 12; i++) {
      let div = document.createElement("div");
      div.innerText = i;

      if (playersCards[p].includes(i)) {
        div.style.color = "red";
      } else {
        div.style.color = "rgb(0, 255, 0)";
      }

      playercardsblock.appendChild(div);
    }
  }
}

function rollDice() {
  return Math.round(Math.random() * 5 + 1);
}

function checkWin() {
  if (playersCards[currentPlayer - 1].length === 0) {
    let buttons = choiceEl.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    });

    let winMessage = document.createElement("div");
    winMessage.style.textAlign = "center";
    winMessage.innerHTML = `<h1 style="color: red;">Player № ${currentPlayer} is Win!</h1>`;

    winblockEl.appendChild(winMessage);

    playerEl.innerText = "";

    return true;
  }
}

function restartGame() {
  let restartbtn = document.createElement("button");
  restartbtn.innerText = "restart game";

  choiceEl.appendChild(restartbtn);

  restartbtn.addEventListener("click", function () {
    playersCards.length = 0;
    winblockEl.innerText = "";

    setupBlock.style.display = "flex";
    gameContainer.style.display = "none";
  });
}

function updateButtonsState(d1, d2, b1, b2) {
  let currentCards = playersCards[currentPlayer - 1];

  let sumExists = currentCards.includes(d1 + d2);
  b2.disabled = !sumExists;
  b2.style.opacity = sumExists ? "1" : "0.3";

  let bothExist = currentCards.includes(d1) || currentCards.includes(d2);
  b1.disabled = !bothExist;
  b1.style.opacity = bothExist ? "1" : "0.3";
}
