'use strict';
const gameContainer = document.querySelector(".game-text-container");

const player1 = {
  name: document.querySelector("#player-1"),
  roundScore: document.querySelector("#p1-round-score"),
  currentScore: document.querySelector("#p1-current-score"),
  activeMarker: document.querySelector("#p1-active-circle"),
};

const player2 = {
  name: document.querySelector("#player-2"),
  roundScore: document.querySelector("#p2-round-score"),
  currentScore: document.querySelector("#p2-current-score"),
  activeMarker: document.querySelector("#p2-active-circle"),
};
const dice1 = document.querySelector("#dice1");
const dice2 = document.querySelector("#dice2");
const dice = [
  "dice1.png",
  "dice2.png",
  "dice3.png",
  "dice4.png",
  "dice5.png",
  "dice6.png",
];
const newGameBttn = document.querySelector("#new-game");
const rollBttn = document.querySelector("#roll");
const holdBttn = document.querySelector("#hold");
const finalScoreBttn = document.querySelector("#final");

const emptyFinalScore = function () {
  finalScoreBttn.value = "";
  finalScoreBttn.classList.remove("add-score");
};

const getFinalScore = function () {
  let finalScore;
  if (finalScoreBttn.value === "") {
    finalScore = Number(finalScoreBttn.getAttribute("placeholder"));
  } else {
    finalScore = finalScoreBttn.value;
  }
  console.log(finalScore);
  return finalScore;
};

let activePlayer = player1;
let inactivePlayer = player2;

function rollDice() {
  finalScoreBttn.classList.remove("add-score");
  let randNum1 = Math.floor(Math.random() * 6);
  let randNum2 = Math.floor(Math.random() * 6);
  let rollScore = randNum1 + 1 + (randNum2 + 1);
  dice1.src = dice[randNum1];
  dice2.src = dice[randNum2];
  if (randNum1 === 0 || randNum2 === 0) {
    activePlayer.currentScore.textContent = "0";
    switchPlayer();
  } else {
    activePlayer.currentScore.textContent =
      Number(activePlayer.currentScore.textContent) + rollScore;
  }
}

function HoldCurrentScore() {
  activePlayer.roundScore.textContent =
    Number(activePlayer.roundScore.textContent) +
    Number(activePlayer.currentScore.textContent);
  activePlayer.currentScore.textContent = "0";
  checkForWin();
}

function checkForWin() {
  let winningScore = Number(getFinalScore());
  if (activePlayer.roundScore.textContent >= winningScore) {
    activePlayer.name.classList.add("winner");
    newGameBttn.classList.add("reset-game");
    activePlayer.name.textContent = " Winner!";
    rollBttn.removeEventListener("click", rollDice);
    holdBttn.removeEventListener("click", HoldCurrentScore);
  } else {
    switchPlayer();
  }
}
function switchPlayer() {
  if (activePlayer === player1) {
    activePlayer = player2;
    inactivePlayer = player1;
    gameContainer.setAttribute("id", "inactive");
  } else {
    activePlayer = player1;
    inactivePlayer = player2;
    gameContainer.removeAttribute("id", "inactive");
  }
  activePlayer.activeMarker.style.visibility = "visible";
  inactivePlayer.activeMarker.style.visibility = "hidden";
}
function ResetGame() {
  activePlayer = player1;
  player1.activeMarker.style.visibility = "visible";
  player2.activeMarker.style.visibility = "hidden";
  player1.name.classList.remove("winner");
  player2.name.classList.remove("winner");
  newGameBttn.classList.remove("reset-game");
  finalScoreBttn.classList.add("add-score");
  finalScoreBttn.setAttribute("placeholder", finalScoreBttn.value);
  gameContainer.removeAttribute("id", "inactive");
  dice1.src = dice2.src = "random-dice.png";
  player1.roundScore.textContent = player1.currentScore.textContent = "0";
  player2.roundScore.textContent = player2.currentScore.textContent = "0";
  player1.name.textContent = "Player 1";
  player2.name.textContent = "Player 2";
  rollBttn.addEventListener("click", rollDice);
  holdBttn.addEventListener("click", HoldCurrentScore);
  if (finalScoreBttn.value === "") {
    finalScoreBttn.setAttribute("placeholder", "100");
  } else {
    finalScoreBttn.setAttribute("placeholder", finalScoreBttn.value);
  }
}

activePlayer.activeMarker.style.visibility = "visible";
finalScoreBttn.addEventListener("keyup", getFinalScore);
finalScoreBttn.addEventListener("click", emptyFinalScore);
newGameBttn.addEventListener("click", ResetGame);
rollBttn.addEventListener("click", rollDice);
holdBttn.addEventListener("click", HoldCurrentScore);
