let CountPlayers=2;
let PlayersCards = [];

const setupBlock = document.querySelector("#setup");
const gameContainer = document.querySelector("#game-container");
const startBtn = document.querySelector("#startBtn");
const playersInput = document.querySelector("#playersInput");


startBtn.addEventListener("click", initGame);


function initGame() {
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
}

function removeCards(cardsToRemove) {
  // remove from cards

  PlayersCards[currentplayer - 1] = PlayersCards[currentplayer - 1].filter(
    (card) => !cardsToRemove.includes(card),
  );
  if (IsWin()) {
    RestartGame();
    renderCards();
    return;
  }
  currentplayer == CountPlayers ? (currentplayer = 1) : currentplayer++;

  renderCards();
  renderTurn();
}

function renderTurn() {
  let d1 = rollDice();
  let d2 = rollDice();

  let b1 = document.createElement("button");

  let player = document.querySelector("#player");
  player.innerHTML = `<h3>Ход игрока: ${currentplayer}</h3>`;

  b1.innerText = d1 + " , " + d2;

  // Listen click and call removeCards([d1, d2])

  let b2 = document.createElement("button");

  b2.innerText = d1 + d2;

  updateButtonsState(d1,d2,b1,b2);

  b2.addEventListener("click", () => removeCards([d1 + d2]));
  b1.addEventListener("click", () => removeCards([d1, d2]));
  // Listen click and call removeCards([d1+d2])

  let choice = document.querySelector("#choice");
  choice.innerHTML = "";

  choice.appendChild(b1);
  choice.appendChild(b2);

  let skipbtn = document.createElement("button");
  skipbtn.innerText = "Skip";
  skipbtn.addEventListener("click", () => {
    currentplayer == CountPlayers ? (currentplayer = 1) : currentplayer++;
    renderTurn();
    
  });

  choice.appendChild(skipbtn); 
}

function renderCards() {
  let cardsEl = document.querySelector("#cards");
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
        div.style.color = "green";
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
    let buttons = document.querySelectorAll("#choice button");
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    });

    let winblock = document.querySelector("#winblock");
    let winMessage = document.createElement("div");
    winMessage.style.textAlign = "center";
    winMessage.innerHTML = `<h1 style="color: red;">Победил игрок № ${currentplayer}!</h1>`;

    winblock.appendChild(winMessage);

    let player = document.querySelector("#player");
    player.innerText = "";

    return true;
  }
}

function RestartGame() {
  let choice = document.querySelector("#choice");

  let restartbtn = document.createElement("button");
  restartbtn.innerText = "restart game";

  choice.appendChild(restartbtn);

  restartbtn.addEventListener("click", function () {
    PlayersCards.length = 0;
    for (let i = 0; i < CountPlayers; i++) {
      PlayersCards.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
    currentplayer = 1;
    renderCards();
    renderTurn();
    let winblock = document.querySelector("#winblock");
    winblock.innerText = "";
  });
  
}


function updateButtonsState(d1, d2,b1,b2) {
  const currentCards = PlayersCards[currentplayer - 1];
  
  let sumExists = currentCards.includes(d1 + d2);
  b2.disabled = !sumExists; 
  b2.style.opacity = sumExists ? "1" : "0.3";

  
  let bothExist = currentCards.includes(d1) || currentCards.includes(d2);
  b1.disabled = !bothExist; 
  b1.style.opacity = bothExist ? "1" : "0.3";
}


