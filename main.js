
// Player factory function
function createPlayer(nameArg){
  let name = nameArg;
  let myMoves = [];
  return { name };
}


//GameBoard module
const GameBoard = ( () => {
  let gameboard = {
    '#a1': '',
    '#a2': '',
    '#a3': '',
    '#b1': '',
    '#b2': '',
    '#b3': '',
    '#c1': '',
    '#c2': '',
    '#c3': ''
  };

  //populate game board with values in gameboard array
  let populateGameBoard = function(){
    for(let key in gameboard){
      let cellQuery = document.querySelector(key);
      if( gameboard.hasOwnProperty(key)){
        cellQuery.textContent = gameboard[key];
      }
    }
  };
  // assign value to cell
  let assignValue = function(cell, value){
    if(gameboard[cell] === ''){
      gameboard[cell] = value;
      populateGameBoard();
    }else{
      throw new Error("Cannot assign a new value to a populated cell.")
    }
  }
  let getGameBoard = function(){
    return gameboard;
  }
  return {getGameBoard, assignValue, populateGameBoard};
})();


// Gameplay Module
const Gameplay = ( () => {
  let gameStarted = false;
  let player1 = createPlayer("Player 1");
  let player2 = createPlayer("Player 2");
  let turn = true;
  let applyEventListeners = function(){
    let startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener('click', ()=> initializeGame() );
  }
  let getPlayersNames = function(){
    let p1Name = document.querySelector("#plr1").value;
    let p2Name = document.querySelector("#plr2").value;
    console.log(p1Name, ' ', p2Name);
  }
  let changePlayersNames = function(){
    let p1Name = document.querySelector("#plr1").value;
    let p2Name = document.querySelector("#plr2").value;
    player1.name = p1Name;
    player2.name = p2Name;
  }
  let initializeGame = function(){
    if(!gameStarted){
      changePlayersNames();
      gameStarted = true;
    }else{
      throw new Error("Game already started.")
    }
  }
  let makeAMove = function(){
    let gb = GameBoard.getGameBoard();
    console.log('gb: ', gb)
    for(let key in gb){
      let cellQuery = document.querySelector(key);
      if( gb.hasOwnProperty(key)){
        console.log('inside MAM')
        cellQuery.addEventListener('click', (e)=> {
          if(turn){
            GameBoard.assignValue(key, 'O')
            turn = !turn;
          }else{
            GameBoard.assignValue(key, 'X')
            turn = !turn;
          }
        });
      }
    }
  };

  return{ applyEventListeners, makeAMove, player1, player2 }
})();

function render(){
  GameBoard.populateGameBoard();
  Gameplay.applyEventListeners();
  Gameplay.makeAMove();
}

render();
