
// Player factory function
function createPlayer(nameArg){
  let name = nameArg;
  let sign = 'O';
  return { name, sign };
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

  // let gameboard = {
  //   '#a1': 'a1',
  //   '#a2': 'a2',
  //   '#a3': 'a3',
  //   '#b1': 'b1',
  //   '#b2': 'b2',
  //   '#b3': 'b3',
  //   '#c1': 'c1',
  //   '#c2': 'c2',
  //   '#c3': 'c3'
  // };

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
  let gameActive = false;
  let gb = GameBoard.getGameBoard();
  let player1 = createPlayer("Player 1", "O");
  let player2 = createPlayer("Player 2", "X");
  let turn = true;
  let checkWinningSign = function(){
    // possible win scenarios
    // a1, a2, a3 is same or a3, b3, c3 is same or a1, b1, c1 is same, or a2, b2, c2 is same, c1, c2, c3 is same
    // or a1, b2, c3 is same or a3, b2, c1 is same
    let a1 = gb["#a1"];
    let a3 = gb["#a3"];
    let c2 = gb["#c2"];
    console.log(gb);
    if( a1 != '' ){
      if( (a1 === gb["#a2"] && a1 === gb["#a3"]) || (a1 === gb["#b1"] && a1 === gb["#c1"]) || (a1 === gb["#b2"] && a1 === gb["#c3"]) ){
        return a1;
      }
    }

    if( a3 != '' ){
      if( (a3 === gb["#b3"] && a3 === gb["#c3"]) || (a3 === gb["#b2"] && a3 === gb["#c1"])){
        return a3;
      }
    }

    if( c2 != '' ){
      if( (c2 === gb["#a2"] && c2 === gb["#b2"]) || (c2 === gb["#c1"] && c2 === gb["#c3"]) ){
        return c2;
      }
    }

    return false;

  }

  const checkWin = function(){
    const winningSign = checkWinningSign();
    if(winningSign){
      gameActive = false;
      if(winningSign === 'O'){
        printWinner(player1.name);
      }else{
        printWinner(player2.name);
      }
    }
  }

  const printWinner = function(winnerName){
    const winnerElement = document.querySelector("#winner-text");
    winnerElement.textContent = `${winnerName} won!`
  }

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
    if(!gameActive){
      changePlayersNames();
      gameActive = true;
    }else{
      throw new Error("Game already started.")
    }
  }
  let makeAMove = function(){
    console.log('gb: ', gb)
    for(let key in gb){
      let cellQuery = document.querySelector(key);
      if( gb.hasOwnProperty(key)){
        console.log('inside MAM')
        cellQuery.addEventListener('click', (e)=> {
          if(turn){
            GameBoard.assignValue(key, 'O')
            let x = checkWinningSign();
            if(x)console.log(x, ' WINS');
            turn = !turn;
          }else{
            GameBoard.assignValue(key, 'X')
            let x = checkWinningSign();
            if(x)console.log(x, ' WINS');
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
