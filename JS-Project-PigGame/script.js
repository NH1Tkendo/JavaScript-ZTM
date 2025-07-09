'use strict';

// Khai bao bien
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// Mac dinh
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

//Quay xuc sac
btnRoll.addEventListener('click', function () {
  //1. Quay xuc sac
  const roll = Math.trunc(Math.random() * 6) + 1;
  //2. Hien thi ket qua
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${roll}.png`;
  //3. Neu ket qua = 1 thi chuyen cho nguoi choi khac
  if (roll !== 1) {
    currentScore += roll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    document.getElementById(`current--${activePlayer}`).textContent = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
  }
});
