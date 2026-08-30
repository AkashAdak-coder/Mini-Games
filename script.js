// Tab Switch Logic
const gameBtns = document.querySelectorAll('.game-btn');

function switchTab(tabId){
  document.querySelectorAll('.game-btn').forEach( btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.game-content').forEach( tab => tab.classList.remove('active'));


  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Rock Paper Scissor Game Logic
let result = '';
let intervalId;
let isAutoPlay = false;

const scores = JSON.parse(localStorage.getItem('score')) || {
  win : 0,
  lose : 0,
  tie : 0
};

const rpcBtn = document.querySelectorAll('.js-rock-paper-scissor-btn');
const resetScoreBtn = document.querySelector('.js-reset-score-btn');
const autoPlayBtn = document.querySelector('.js-auto-play-btn');

rpcBtn.forEach((button) =>{
  button.addEventListener('click', () =>{
    if(button.getAttribute('title') === 'rock'){
      game('rock');
    } else if(button.getAttribute('title') === 'paper'){
      game('paper');
    } else if(button.getAttribute('title') === 'scissor'){
      game('scissor');
    }

    console.log(result);
  });
});

resetScoreBtn.addEventListener('click', () => {
  resetScore();
});

autoPlayBtn.addEventListener("click", () => {
  autoPlay;
});

function game(userMove){
    const computerMove = pickRandomMove();

    if((userMove === 'rock' &&  computerMove === 'paper')|| (userMove === 'scissor' && computerMove === 'rock') || (userMove === 'paper' && computerMove === 'scissor')){

      result = "Lose";
      scores.lose += 1;

    } else if((userMove === 'rock' && computerMove === 'scissor')|| (userMove === 'scissor' && computerMove === 'paper') || (userMove === 'paper' && computerMove === 'rock')){

      result = 'Win';
      scores.win += 1;

    } else {

      result = 'Tie';
      scores.tie += 1;

    }

    localStorage.setItem('score',JSON.stringify(scores));
    resultDisplay();
    showMoves(userMove,computerMove);
    displayScoreResult();   
}

function pickRandomMove(){
  const count = Math.floor(Math.random() * 3);
  const move = ['rock','paper','scissor'];
  return move[count];
}

function resetScore(){   
  scores.win = 0;
  scores.lose = 0;
  scores.tie = 0;
  localStorage.removeItem('score');
  displayScoreResult();

  alert('score has been reset!');
}

function resultDisplay(){
  document.querySelector('.js-result').textContent = `${result}`;
}

function displayScoreResult(){
  let scoreDisplay = document.querySelector('.js-count-result');

  scoreDisplay.innerHTML = `Win: ${scores.win}  Lose: ${scores.lose}  Tie: ${scores.tie}`;
}

function showMoves(move1,move2){
  const showMove = document.querySelector('.js-show-moves');

  if (move1 === 'rock' && move2 === 'paper'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand-back-fist"></i>
      <i class="fa-solid fa-hand"></i>
    `;
  } else if(move1 === 'rock' && move2 === 'scissor'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand-back-fist"></i>
      <i class="fa-solid fa-hand-scissors"></i>
    `;
  }else if(move1 === 'paper' && move2 === 'scissor'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand"></i>
      <i class="fa-solid fa-hand-scissors"></i>
    `;
  }else if(move1 === 'paper' && move2 === 'rock'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand"></i>
      <i class="fa-solid fa-hand-back-fist"></i>
    `;
  }else if(move1 === 'scissor' && move2 === 'rock'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand-scissors"></i>
      <i class="fa-solid fa-hand-back-fist"></i>
    `;
  }else if(move1 === 'scissor' && move2 === 'paper'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand-scissors"></i>
      <i class="fa-solid fa-hand"></i>
    `;
  }else if(move1 === 'scissor' && move2 === 'scissor'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand-scissors"></i>
      <i class="fa-solid fa-hand-scissors"></i>
    `;
  }else if(move1 === 'paper' && move2 === 'paper'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand"></i>
      <i class="fa-solid fa-hand"></i>
    `;
  }else if(move1 === 'rock' && move2 === 'rock'){
    showMove.innerHTML = `
      <i class="fa-solid fa-hand-back-fist"></i>
      <i class="fa-solid fa-hand-back-fist"></i>
    `;
  }
}

function autoPlay(){
  if(!isAutoPlay){
    intervalId = setInterval(() =>{
      let userMove = pickRandomMove();
      game(userMove);
    },1000);
    autoPlayBtn.textContent = 'stop playing';
    isAutoPlay = true;
  } else{
    clearInterval(intervalId);
    autoPlayBtn.textContent = 'auto-play';
    isAutoPlay = false;
  }
}

// Tic Tac Toe Game Logic
const buttons = document.querySelectorAll('.js-btns');
const resultDiv = document.querySelector('.winner-result-box');
const resetBtn = document.querySelector('.reset-game');

let turn = true;
let move;
const winningPetterns = [
  [0,1,2],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [3,4,5],
  [6,7,8],
  [2,4,6],
  [0,4,8]
];

buttons.forEach( (button,index) => {
  button.addEventListener('click', () => {
    if(turn){
      turn = false;
      button.textContent = 'X';
    } else {
      turn = true;
      button.textContent = '0';
    }
    button.disabled = true;
    winner();
  });
});

let count = 0;
function winner(){
  winningPetterns.forEach( pattern => {
    count++;
    let pos1 = buttons[pattern[0]].textContent;
    let pos2 = buttons[pattern[1]].textContent;
    let pos3 = buttons[pattern[2]].textContent;
    
    if(pos1 != '' && pos2 != '' && pos3 != ''){
      if((pos1 === pos2) && (pos2 === pos3)){
        buttons.forEach(btn => {
          btn.disabled = true;
        })
        displayResult(pos1);
      } else if(count === 72){
        displayResult('draw');
      }
    }
  });
}

function displayResult(move){
  if(move === 'X'){
    resultDiv.textContent = 'Player1 Win';
  } else if (move === '0'){
    resultDiv.textContent = 'Player2 Win'
  } else {
    resultDiv.textContent = 'Draw';
  }
}

resetBtn.addEventListener('click', () => {
  buttons.forEach( button => {
    button.textContent = '';
    resultDiv.textContent = '';
    button.disabled = false;
    count = 0;
  })
});