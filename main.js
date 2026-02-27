let CountPlayers = 2;
let PlayersCards = [];
let currentplayer = 1;

// Вынесенные элементы
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
  if (playersInput.value > 1 && playersInput.value < 9) {
    CountPlayers = parseInt(playersInput.value);
    PlayersCards = [];
    for (let i = 0; i < CountPlayers; i++) {
      PlayersCards.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    currentplayer = 1;

    setupBlock.style.display = "none";
    gameContainer.style.display = "block";

    renderCards();
    renderTurn();
  } else {
    alert("Число игроков не должно быть больше 8-ми и меньше 1-го");
  }
}

function switchPlayer() {
  if (currentplayer == CountPlayers) {
    currentplayer = 1;
  } else {
    currentplayer++;
  }
  renderCards();
  renderTurn();
}

function removeCards(cardsToRemove) {
  PlayersCards[currentplayer - 1] = PlayersCards[currentplayer - 1].filter(
    (card) => !cardsToRemove.includes(card),
  );
  if (IsWin()) {
    RestartGame();
    renderCards();
    return;
  }

  switchPlayer();
}

function renderTurn() {
  playerEl.innerHTML = `<h3>Ход игрока: ${currentplayer}</h3>`;

  choiceEl.innerHTML = "";

  let rollBtn = document.createElement("button");
  rollBtn.style.marginTop = "10px";
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
  resultText.innerHTML = `<h3>Выпало: ${d1} и ${d2}</h3>`;
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
    currentplayer = currentplayer == CountPlayers ? 1 : currentplayer + 1;
    renderCards();
    renderTurn();
  });
  
  buttonsContainer.appendChild(b1);
  buttonsContainer.appendChild(b2);
  buttonsContainer.appendChild(skipbtn);

  choiceEl.appendChild(buttonsContainer);
}

function renderCards() {
  cardsEl.innerHTML = "";

  for (let p = 0; p < CountPlayers; p++) {
    let playercardsblock = document.createElement("div");
    playercardsblock.innerHTML = `<h3>Игрок №${p + 1}</h3>`;
    cardsEl.appendChild(playercardsblock);

    for (let i = 1; i <= 12; i++) {
      let div = document.createElement("div");
      div.innerText = i;

      if (PlayersCards[p].includes(i)) {
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

function IsWin() {
  if (PlayersCards[currentplayer - 1].length == 0) {
    let buttons = choiceEl.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    });

    let winMessage = document.createElement("div");
    winMessage.style.textAlign = "center";
    winMessage.innerHTML = `<h1 style="color: red;">Победил игрок № ${currentplayer}!</h1>`;

    winblockEl.appendChild(winMessage);

    playerEl.innerText = "";

    return true;
  }
}

function RestartGame() {
  let restartbtn = document.createElement("button");
  restartbtn.innerText = "restart game";

  choiceEl.appendChild(restartbtn);

  restartbtn.addEventListener("click", function () {
    PlayersCards.length = 0;
    for (let i = 0; i < CountPlayers; i++) {
      PlayersCards.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
    currentplayer = 1;
    renderCards();
    renderTurn();
    winblockEl.innerText = "";

    setupBlock.style.display = "flex";
    gameContainer.style.display = "none";
  });
}

function updateButtonsState(d1, d2, b1, b2) {
  const currentCards = PlayersCards[currentplayer - 1];

  let sumExists = currentCards.includes(d1 + d2);
  b2.disabled = !sumExists;
  b2.style.opacity = sumExists ? "1" : "0.3";

  let bothExist = currentCards.includes(d1) || currentCards.includes(d2);
  b1.disabled = !bothExist;
  b1.style.opacity = bothExist ? "1" : "0.3";
}