let CountPlayers=2;
let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let currentplayer = 1;

renderCards();
renderTurn();

function removeCards(cardsToRemove) {
  // remove from cards
  cards = cards.filter((card) => !cardsToRemove.includes(card));
  

  renderCards();
  renderTurn();
  if(IsWin()){
    RestartGame();
  };
  currentplayer == 1 ? currentplayer++ : currentplayer--;
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

  b2.addEventListener("click", () => removeCards([d1 + d2]));
  b1.addEventListener("click", () => removeCards([d1, d2]));
  // Listen click and call removeCards([d1+d2])

  let choice = document.querySelector("#choice");
  choice.innerHTML = "";

  choice.appendChild(b1);
  choice.appendChild(b2);
}

function renderCards() {
  let cardsEl = document.querySelector("#cards");
  cardsEl.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    let div = document.createElement("div");
    div.innerText = i + 1;

    cards.includes(i+1)?div.style.color = "red":div.style.color = "green"
    

    cardsEl.appendChild(div);
  }
}

function rollDice() {
  return Math.round(Math.random() * 5+1);
}

function IsWin() {
  if (cards.length === 0) {

    let buttons = document.querySelectorAll("#choice button");
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    });

    let winblock = document.querySelector("#winblock")
    let winMessage = document.createElement("div");
    winMessage.style.textAlign = "center";
    winMessage.innerHTML = `<h1 style="color: red;">Победил игрок № ${currentplayer==2?1:2}!</h1>`
    
    winblock.appendChild(winMessage);

    let player = document.querySelector("#player")
    player.innerText= ""

    return true;
  }
}

function RestartGame(){
    let choice = document.querySelector("#choice");

    let restartbtn=document.createElement("button")
    restartbtn.innerText="restart game";

    choice.appendChild(restartbtn);

    restartbtn.addEventListener("click",function(){
        cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        renderCards();
        renderTurn();
        let winblock = document.querySelector("#winblock");
        winblock.innerText= ""

    })

}

