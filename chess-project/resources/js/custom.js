// TODO:
//     Bug:
//     1. When resize the window the animation is in trasition
//     2. Is white turn when it shouldnt be
//        This bug happens on the first piece moved, if clicked 2 times
//        it will be his turn and it will allow other pieces to move too
//     3. After the Start game is clicked for the second time, its always
//        white turn
//
//     Important:
//     1. Ajust the front-end
//     2. Add animations when inserting the initial pieces
//     3. save all the movements made in board(maybe mongodb)
//        undo have to return multiple times and not just 1

//     Additional:
//     1. if clicked again in start game, the game should reset
//     2. if clicked again in the piece, will not show the possibilities
//     3. show the dead pieces on the side

//     refactoring:
//     create more classes
//     reduce side effects on functions
//     organize functions according to stepdown rule
//     refactor the functions to be more pure
//     refactor the class pawn

let line
let column
const table = document.getElementsByClassName('game-table')

const board = new Board()

const boardClick = (elem) => {
  elem.preventDefault()
  line = parseInt(elem.target.parentNode.id)
  column = parseInt(elem.target.id)

  printChoices(line, column)
  if(isPossibleToInsertPiece(line, column)){
    insertPieceInPosition(line, column)
    board.turn.changeTurn()
    checkIfGameIsFinished()
  }
  board.dom.updateScore()

}

const printChoices = (line, column) => {
  if (board.turn.side === board.table[line][column].side) {
    board.dom.printChoices(line, column, board);
    if (board.table[line][column].name !== 'nothing') {
      board.actual_object = board.table[line][column];
    }
  }
}
const isPossibleToInsertPiece = (line, column) => {
  if (board.choices[line][column] === 1) {
    return true
  }
  return false
}
const insertPieceInPosition = (line, column) => {
  board.insertPosition(line, column, board.actual_object);
}
const checkIfGameIsFinished = () => {
  if(board.isKingInCheck()){
    if(board.isGameFinished()){
      board.dom.finishGame(board.turn.other_side)
      debugger
    }
  }
}

table[0].addEventListener('click', boardClick)

//undo button
const undo = document.getElementById('undo')

const buttonClickUndo = (elem) => {
  console.log('Button undo clicked')
  board.undo()
  board.turn.changeTurn()
  board.createMatrixChoices()
  board.dom.updateScore()
}

undo.addEventListener('click', buttonClickUndo)

//start button
const start = document.getElementById('start-game');

const buttonClickStartGame = (elem) => {
  startGame()
}

const startGame = () => {
  resetGame()
  board.dom.fulfilCss(5)
  insertInitialPieces()
  board.turn.side = 'white'
  board.dom.updateScore()
}
const resetGame = () => {
  removePieces()
  resetScore()
}

const removePieces = () => {
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      board.removePiece(i, j)
    }
  }
}
const resetScore = () => {
  board.number_black_pieces_dead = 0;
  board.number_black_pieces_dead = 0;
}

start.addEventListener('click', buttonClickStartGame);

const insertInitialPieces = () => {
  board.king_white = new King('king', 'white');
  board.king_black = new King('king', 'black');
  board.bishop_white1 = new Bishop('bishop', 'white');
  board.bishop_white2 = new Bishop('bishop', 'white');
  board.bishop_black1 = new Bishop('bishop', 'black');
  board.bishop_black2 = new Bishop('bishop', 'black');
  board.knight_white1 = new Knight('knight', 'white');
  board.knight_white2 = new Knight('knight', 'white');
  board.knight_black1 = new Knight('knight', 'black');
  board.knight_black2 = new Knight('knight', 'black');
  board.rook_white1 = new Rook('rook', 'white');
  board.rook_white2 = new Rook('rook', 'white');
  board.rook_black1 = new Rook('rook', 'black');
  board.rook_black2 = new Rook('rook', 'black');
  board.pawn_white1 = new Pawn('pawn', 'white');
  board.pawn_white2 = new Pawn('pawn', 'white');
  board.pawn_white3 = new Pawn('pawn', 'white');
  board.pawn_white4 = new Pawn('pawn', 'white');
  board.pawn_white5 = new Pawn('pawn', 'white');
  board.pawn_white6 = new Pawn('pawn', 'white');
  board.pawn_white7 = new Pawn('pawn', 'white');
  board.pawn_white8 = new Pawn('pawn', 'white');
  board.pawn_black1 = new Pawn('pawn', 'black');
  board.pawn_black2 = new Pawn('pawn', 'black');
  board.pawn_black3 = new Pawn('pawn', 'black');
  board.pawn_black4 = new Pawn('pawn', 'black');
  board.pawn_black5 = new Pawn('pawn', 'black');
  board.pawn_black6 = new Pawn('pawn', 'black');
  board.pawn_black7 = new Pawn('pawn', 'black');
  board.pawn_black8 = new Pawn('pawn', 'black');

  board.queen_white = new Queen('queen', 'white');
  board.queen_black = new Queen('queen', 'black');

  board.insertPiece(7, 4, board.king_white);
  board.insertPiece(0, 4, board.king_black);
  board.insertPiece(7, 2, board.bishop_white1);
  board.insertPiece(7, 5, board.bishop_white2);
  board.insertPiece(0, 2, board.bishop_black1);
  board.insertPiece(0, 5, board.bishop_black2);
  board.insertPiece(7, 1, board.knight_white1);
  board.insertPiece(7, 6, board.knight_white2);
  board.insertPiece(0, 1, board.knight_black1);
  board.insertPiece(0, 6, board.knight_black2);
  board.insertPiece(7, 0, board.rook_white1);
  board.insertPiece(7, 7, board.rook_white2);
  board.insertPiece(0, 0, board.rook_black1);
  board.insertPiece(0, 7, board.rook_black2);
  board.insertPiece(1, 0, board.pawn_black1);
  board.insertPiece(1, 1, board.pawn_black2);
  board.insertPiece(1, 2, board.pawn_black3);
  board.insertPiece(1, 3, board.pawn_black4);
  board.insertPiece(1, 4, board.pawn_black5);
  board.insertPiece(1, 5, board.pawn_black6);
  board.insertPiece(1, 6, board.pawn_black7);
  board.insertPiece(1, 7, board.pawn_black8);
  board.insertPiece(6, 0, board.pawn_white1);
  board.insertPiece(6, 1, board.pawn_white2);
  board.insertPiece(6, 2, board.pawn_white3);
  board.insertPiece(6, 3, board.pawn_white4);
  board.insertPiece(6, 4, board.pawn_white5);
  board.insertPiece(6, 5, board.pawn_white6);
  board.insertPiece(6, 6, board.pawn_white7);
  board.insertPiece(6, 7, board.pawn_white8);
  board.insertPiece(7, 3, board.queen_white);
  board.insertPiece(0, 3, board.queen_black);
}