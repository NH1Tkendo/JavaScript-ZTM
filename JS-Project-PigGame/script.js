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
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');

let score, currentScore, activePlayer, playing;

// Choi lai
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();
//Xu ly diem
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

const scoreCount = test => {
  if (playing) {
    score[activePlayer] += test === false ? 0 : currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};
//Quay xuc sac
btnRoll.addEventListener('click', function () {
  if (playing) {
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
      scoreCount(false);
    }
  }
});

btnHold.addEventListener('click', function () {
  scoreCount(true);
});

btnNew.addEventListener('click', init);
