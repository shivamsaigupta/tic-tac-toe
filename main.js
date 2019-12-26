
const calculator = (() => {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return {
    add,
    sub,
    mul,
    div,
  };
})();

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

  return {gameboard};

})();

function render(){
  //let myGame = GameBoard();
  let gameboard = GameBoard.gameboard;

  for(let key in gameboard){
    if( gameboard.hasOwnProperty(key)){
      console.log(key, ' -> ', gameboard[key]);
      let cellQuery = document.querySelector(key);
      cellQuery.textContent = gameboard[key];
    }
  }

}

render();
