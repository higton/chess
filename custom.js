// TODO:
//     important:
//     if the king can't move, check mate!
//     add animations when inserting position
//     save all the movements made in board
//     undo have to return multiple times and not just 1

//     additional:
//     if clicke in start game, the game should start
//     if clicked again in start game, the game should reset
//     if clicked again in the piece, will not show the possibilities
//     show the dead pieces on the side

//     refactoring:
//     separate the code in multiple files
//     create more classes
//     reduce side effects on functions
//     organize functions according to stepdown rule
//     refactor the if conditions to be more pure
//     refactor the class pawn

let line;
let column;
const table = document.getElementsByClassName('game-table');


const board = new Board();

const check_turn_side = (line, column) => {
  if (board.turn.side === board.table[line][column].side) {
    board.dom.print_choices(line, column, board);
    if (board.table[line][column].name !== 'nothing') {
      board.actual_object = board.table[line][column];
    }
  }
};
const check_position = (line, column) => {
  if (board.choices[line][column] === 1) {
    board.insert_position(line, column, board.actual_object);
    board.turn.changeTurn();
  }
};
const print_pieces_dead_html = () => {
  let paragraph = document.getElementById('p1');
  paragraph.textContent = board.number_white_pieces_dead;
  paragraph = document.getElementById('p2');
  paragraph.textContent = board.number_black_pieces_dead;
};

const boardClick = (elem) => {
  elem.preventDefault();
  line = parseInt(elem.target.parentNode.id);
  column = parseInt(elem.target.id);

  check_turn_side(line, column);
  check_position(line, column);
  print_pieces_dead_html();
};

table[0].addEventListener('click', boardClick);

const start = document.getElementById('start-game');
const buttonClickStartGame = (elem) => {
  start_game();
};

const undo = document.getElementById('undo');

const buttonClickUndo = (elem) => {
  console.log('Button undo clicked');
  board.undo();
  board.turn.changeTurn();
  board.create_matrix_choices();
  print_pieces_dead_html();
};

undo.addEventListener('click', buttonClickUndo);

const start_game = () => {
  board.dom.fulfil_css();
};

start.addEventListener('click', buttonClickStartGame);
