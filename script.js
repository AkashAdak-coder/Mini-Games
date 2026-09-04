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
const singleModeBtn = document.querySelector('.js-single-mode-btn');

let turn = true;
let gameover = false;
let mode = 'dual-mode';
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


buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if(mode === 'single-mode'){
      if(btn.textContent === ''){
        btn.textContent = '0';
        btn.disabled = true;
        checkWinner();
        if(!gameover){
          gameover = true;
          setTimeout(pickCompanionMove,1000);
        }
      }
    }else{
      if(turn){
        btn.textContent = 'x';
        turn = false;
      } else{
        btn.textContent = '0';
        turn = true;
      }
      btn.disabled = true;
      checkWinner();
    }
  })
})

function displayWinner(winner){
  if(winner === 'x'){
    resultDiv.textContent = 'Player1 Win';
  } else if(winner === '0'){
    resultDiv.textContent = 'Player2 Win';
  } else {
    resultDiv.textContent = 'Draw';
  }
}

function checkWinner(){
  winningPetterns.forEach( pattern => {
    let pos1 = buttons[pattern[0]].textContent;
    let pos2 = buttons[pattern[1]].textContent;
    let pos3 = buttons[pattern[2]].textContent;

    if(pos1 !== '' && pos1 === pos2 && pos2 === pos3){
      displayWinner(pos1);
      gameover = true;
    }

    let isEmpty = Array.from(buttons).every(btn => btn.textContent !== '');
    if(isEmpty){
      displayWinner('draw');
      gameover =  true;
    }

    if(gameover){
      buttons.forEach(btn => {
        btn.disabled = true;
      });
    }
  })
}

function resetGame(){
  gameover = false;

  buttons.forEach(btn => {
    btn.disabled = false;
    btn.textContent = '';
  });

  resultDiv.textContent = '';
  turn = true;
  mode = 'dual-mode';
  gameover = false;
  singleModeBtn.textContent = 'Play With Computer';
}

resetBtn.addEventListener('click', resetGame);

singleModeBtn.addEventListener('click', ()=>{
  mode = 'single-mode';
  singleModeBtn.textContent = 'Playing...';
});

function pickCompanionMove(){
  let emptyIndexs = [];

  buttons.forEach((btn,index) => {
    if(btn.textContent === ''){
      emptyIndexs.push(index);
    }
  });

  if(emptyIndexs.length === 0){
    return;
  }

  let companion = Math.floor(Math.random() * emptyIndexs.length);
  let moveIndex = emptyIndexs[companion];

  buttons[moveIndex].textContent = 'x';
  buttons[moveIndex].disabled = true;
  gameover = false;
}