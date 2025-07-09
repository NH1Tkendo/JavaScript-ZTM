'use strict';

//Tao so ngau nhien
let num = Math.trunc(Math.random() * 20) + 1;

//Xu ly su kien thong bao
const message = message =>
  (document.querySelector('.message').textContent = message);

//Xu ly cac su kien tinh diem
let score = 20;
let highScore = 0;

const minusScore = () => {
  score -= 1;
  if (score > 0) {
    document.querySelector('.score').textContent = score;
  } else {
    message('Game Over');
    document.querySelector('body').style.backgroundColor = '#FF0000';
  }
};
//Xu ly su kien cho nut check
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    message('No number ⚠️');
  } else if (guess === num) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = num;
    message('Correct ✅');

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== num) {
    message(guess > num ? 'Too high' : 'Too low');
    minusScore();
  }
});
//Xu ly su kien play again
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  num = Math.trunc(Math.random() * 20) + 1;
  message('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style = '#222';
});
