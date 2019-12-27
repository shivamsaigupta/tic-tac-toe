
// Player factory function
function createPlayer(nameArg){
  let name = nameArg;
  let myMoves = [];
  let makeMove = function(cell){
    myMoves.push(cell);
  }
  return { name, makeMove };
}


//GameBoard module
const GameBoard = ( () => {
  let gameboard = {
    '#a1': 'A',
    '#a2': 'B',
    '#a3': 'C',
    '#b1': 'D',
    '#b2': 'E',
    '#b3': 'F',
    '#c1': 'G',
    '#c2': 'H',
    '#c3': 'I'
  };

  let applyEventListeners = function(){
    for(let key in gameboard){
      let cellQuery = document.querySelector(key);
      if( gameboard.hasOwnProperty(key)){
        cellQuery.addEventListener('click', (e)=> console.log('hey ', e.target.id));
      }
    }
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
    }else{
      throw new Error("Cannot assign a new value to a populated cell.")
    }
  }
  let getGameBoard = function(){
    return gameboard;
  }
  return {getGameBoard, assignValue, populateGameBoard, applyEventListeners};
})();


// Gameplay Module
const Gameplay = ( () => {
  let whoseTurn
  let gameStarted = false;
  let player1 = createPlayer("Player 1");
  let player2 = createPlayer("Player 2");
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
  return{ applyEventListeners, player1, player2 }
})();

function render(){
  //let myGame = GameBoard();
  GameBoard.populateGameBoard();
  GameBoard.applyEventListeners();
  Gameplay.applyEventListeners();

}

render();
