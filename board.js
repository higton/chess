
class Board {
  constructor() {
    this.turn = new Turn();
    this.dom = new DOM();
    this.obj_nothing = new Nothing();

    this.white_side_points = 0;
    this.black_side_points = 0;
    this.white_pieces_dead = [];
    this.black_pieces_dead = [];
    this.number_black_pieces_dead = 0;
    this.number_white_pieces_dead = 0;
    this.actual_object = {};
    this.createMatrixTable();
    this.createMatrixChoices();
    this.enemyChoices = this.choices;
    this.white_king_in_check = false;
    this.black_king_in_check = false;

    this.king_white = new King('king', 'white');
    this.king_black = new King('king', 'black');
    this.bishop_white1 = new Bishop('bishop', 'white');
    this.bishop_white2 = new Bishop('bishop', 'white');
    this.bishop_black1 = new Bishop('bishop', 'black');
    this.bishop_black2 = new Bishop('bishop', 'black');
    this.knight_white1 = new Knight('knight', 'white');
    this.knight_white2 = new Knight('knight', 'white');
    this.knight_black1 = new Knight('knight', 'black');
    this.knight_black2 = new Knight('knight', 'black');
    this.rook_white1 = new Rook('rook', 'white');
    this.rook_white2 = new Rook('rook', 'white');
    this.rook_black1 = new Rook('rook', 'black');
    this.rook_black2 = new Rook('rook', 'black');
    this.pawn_white1 = new Pawn('pawn', 'white');
    this.pawn_white2 = new Pawn('pawn', 'white');
    this.pawn_white3 = new Pawn('pawn', 'white');
    this.pawn_white4 = new Pawn('pawn', 'white');
    this.pawn_white5 = new Pawn('pawn', 'white');
    this.pawn_white6 = new Pawn('pawn', 'white');
    this.pawn_white7 = new Pawn('pawn', 'white');
    this.pawn_white8 = new Pawn('pawn', 'white');
    this.pawn_black1 = new Pawn('pawn', 'black');
    this.pawn_black2 = new Pawn('pawn', 'black');
    this.pawn_black3 = new Pawn('pawn', 'black');
    this.pawn_black4 = new Pawn('pawn', 'black');
    this.pawn_black5 = new Pawn('pawn', 'black');
    this.pawn_black6 = new Pawn('pawn', 'black');
    this.pawn_black7 = new Pawn('pawn', 'black');
    this.pawn_black8 = new Pawn('pawn', 'black');

    this.queen_white = new Queen('queen', 'white');
    this.queen_black = new Queen('queen', 'black');

    this.insertPiece(7, 4, this.king_white);
    this.insertPiece(0, 4, this.king_black);
    this.insertPiece(7, 2, this.bishop_white1);
    this.insertPiece(7, 5, this.bishop_white2);
    this.insertPiece(0, 2, this.bishop_black1);
    this.insertPiece(0, 5, this.bishop_black2);
    this.insertPiece(7, 1, this.knight_white1);
    this.insertPiece(7, 6, this.knight_white2);
    this.insertPiece(0, 1, this.knight_black1);
    this.insertPiece(0, 6, this.knight_black2);
    this.insertPiece(7, 0, this.rook_white1);
    this.insertPiece(7, 7, this.rook_white2);
    this.insertPiece(0, 0, this.rook_black1);
    this.insertPiece(0, 7, this.rook_black2);
    this.insertPiece(1, 0, this.pawn_black1);
    this.insertPiece(1, 1, this.pawn_black2);
    this.insertPiece(1, 2, this.pawn_black3);
    this.insertPiece(1, 3, this.pawn_black4);
    this.insertPiece(1, 4, this.pawn_black5);
    this.insertPiece(1, 5, this.pawn_black6);
    this.insertPiece(1, 6, this.pawn_black7);
    this.insertPiece(1, 7, this.pawn_black8);
    this.insertPiece(6, 0, this.pawn_white1);
    this.insertPiece(6, 1, this.pawn_white2);
    this.insertPiece(6, 2, this.pawn_white3);
    this.insertPiece(6, 3, this.pawn_white4);
    this.insertPiece(6, 4, this.pawn_white5);
    this.insertPiece(6, 5, this.pawn_white6);
    this.insertPiece(6, 6, this.pawn_white7);
    this.insertPiece(6, 7, this.pawn_white8);
    this.insertPiece(7, 3, this.queen_white);
    this.insertPiece(0, 3, this.queen_black);
  }

  createMatrixChoices() {
    const choices = [];
    for (let i = 0; i < 8; i++) {
      choices.push(new Array(8).fill(0));
    }
    this.choices = choices;
  }

  createMatrixTable() {
    const table = [];
    for (let i = 0; i < 8; i++) {
      table.push(new Array(8).fill(this.obj_nothing));
    }
    this.table = table;
  }

  insertPiece(line, column, piece) {
    this.table[line][column] = piece;
    piece.insertPiece(line, column);
    this.dom.insertImage(line, column, this);
  }

  //impure
  insertPosition(line, column, piece) {
    console.log(
      `Function insertPosition() called in board, line: ${line} column ${column} piece.name  ${piece.name}`,
    );
    this.old_object = 0;

    this.old_positionX = piece.positionX;
    this.old_positionY = piece.positionY;
    this.actual_object = piece;

    if (piece.insertPosition(line, column, this)) {
      // remove images from the actual position
      if (this.dom.removeImage(line, column)) {
        this.old_object = this.table[line][column];
        this.addDeathScore(this.table[line][column]);
      }
      // remove images from the past
      this.dom.removeImage(this.old_positionY, this.old_positionX);

      // replace objects
      this.table[this.old_positionY][this.old_positionX] = this.obj_nothing;
      this.table[line][column] = piece;

      // insert image in the actual position
      this.dom.insertImage(line, column, this);
    }
  }
  //impure
  calculateChoices(line, column, piece) {
    console.log('Function calculateChoices called');
    // calculate choices that will see if the king can move
    if (piece.name === 'king') {
      this.table[line][column] = this.obj_nothing;
      this.enemyChoices = this.calculateEnemySideChoices(piece);
      this.table[line][column] = piece;
    }
    
    let tmpChoices = piece.calculateChoices(this);
    tmpChoices = this.calculatePossibilityReleaseKingFromCheck(piece, tmpChoices);

    return tmpChoices
  }
  undo() {
    let savingChoicesValue = this.copyMatrix(this.choices)

    const tmp = this.old_object;

    this.choices[this.old_positionY][this.old_positionX] = 1;
    this.insertPosition(
      this.old_positionY,
      this.old_positionX,
      this.actual_object,
    );
    this.choices[this.old_positionY][this.old_positionX] = 0;

    // if theres an object attacked, will return to his position
    if (typeof tmp === 'object') {
      this.choices[tmp.positionY][tmp.positionX] = 1;
      this.insertPosition(tmp.positionY, tmp.positionX, tmp);
      this.choices[tmp.positionY][tmp.positionX] = 1;

      this.revertScore(tmp);
    }
    this.choices = this.copyMatrix(savingChoicesValue)
  }
  //impure
  revertScore(tmp) {
    // try fixing the score
    if (tmp.side === 'black' && this.number_black_pieces_dead > 0) {
      this.number_black_pieces_dead -= 1;
    } else if (tmp.side === 'white' && this.number_white_pieces_dead > 0) {
      this.number_white_pieces_dead -= 1;
    }
  }
  //TODO: fix bug on this part of code
  //      when click on some piece that doesnt have choice,
  //      its not getting background red
  calculatePossibilityReleaseKingFromCheck(piece, choices) {
    console.log('Function calculatePossibilityReleaseKingFromCheck() was called',);
    let tmpPositionX = piece.positionX
    let tmpPositionY = piece.positionY

    let savingChoicesValue = this.copyMatrix(this.choices)
    this.choices = this.copyMatrix(choices)


    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (this.choices[i][j] === 1) {
          this.insertPosition(i, j, piece);
          if (this.isKingInCheck()) {
            this.choices[i][j] = 0;
          }
          this.undo();
        }
      }
    }

    let tmp = this.copyMatrix(this.choices)
    this.choices = this.copyMatrix(savingChoicesValue)
    console.table(tmp)
    return tmp
  }
  //impure+-
  isKingInCheck() {
    console.log('Function isKingInCheck() called');
    let enemyChoices = this.enemy_choices

    if (this.turn.side === 'black') {
      enemyChoices = this.calculateEnemySideChoices(this.king_black);
    }
    if (this.turn.side === 'white') {
      enemyChoices = this.calculateEnemySideChoices(this.king_white);
    }

    if (enemyChoices[this.king_white.positionY][this.king_white.positionX] === 1 && this.turn.side === 'white') {
      console.log('okidoki');
      this.dom.changeBackground('red');
      return true;
    }
    if (enemyChoices[this.king_black.positionY][this.king_black.positionX] === 1 && this.turn.side === 'black') {
      console.log('okidoki');
      this.dom.changeBackground('darkred');
      return true;
    }
    this.dom.changeBackground('white');
    return false;
  }
  
  calculateEnemySideChoices(king_obj) {
    // create a loop and calculate the choices in each piece
    let enemyChoices = []

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (this.table[i][j].side === king_obj.other_side) {
          if (this.table[i][j].name !== 'pawn') {
            enemyChoices = this.table[i][j].calculateChoices(this);
          }
          if (this.table[i][j].name === 'pawn') {
            enemyChoices = this.table[i][j].calculateFutureAttack(this);
          }
        }
      }
    } 
    return enemyChoices
  }
  //impure
  addDeathScore(piece) {
    if (piece.side === 'white') {
      this.white_pieces_dead[this.number_white_pieces_dead] = piece;
      this.number_white_pieces_dead += 1;
    } else if (piece.side === 'black') {
      this.black_pieces_dead[this.number_black_pieces_dead] = piece;
      this.number_black_pieces_dead += 1;
    }
  }

  copyMatrix(matrixOrigin){
    let arr = [];
    for (let i = 0; i <= 7; i++) {
      arr.push([0])
      for (let j = 0; j <= 7; j++) {
        arr[i][j] = 0;
      }
    }
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        arr[i][j] = matrixOrigin[i][j];
      }
    }
    return arr
  }
}