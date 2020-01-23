
class Board {
  constructor() {
    this.turn = new Turn();
    this.dom = new DOM();
    this.obj_nothing = new Nothing();
    this.gameStarted = false

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
  }

  createMatrixChoices() {
    this.choices = Matrix.createMatrix()
  }

  createMatrixTable() {
    this.table = Matrix.createMatrix()
  }

  insertPiece(line, column, piece) {
    this.table[line][column] = piece;
    piece.insertPiece(line, column);
    this.dom.insertImage(line, column, this);
  }
  //impure
  removePiece(line, column){
    this.table[line][column] = this.obj_nothing
    this.dom.removeImage(line, column)
  }
  //impure
  insertPosition(line, column, piece) {
    this.old_object = 0;

    this.old_positionX = piece.positionX;
    this.old_positionY = piece.positionY;
    this.actual_object = piece;

    if (piece.insertPosition(line, column, this)) {
      // remove images from the actual position
      if (this.isObject(line, column)) {
        this.old_object = this.table[line][column];
        
        this.addDeathScore(this.table[line][column]);
      }
      this.replaceObjects(line, column, piece)
      return true
    }
    return false
  }
  replaceImages(line, column){
    // remove images from the past and current position
    this.dom.removeImage(this.old_positionY, this.old_positionX);
    this.dom.removeImage(line, column)

    // insert image in the actual position
    this.dom.insertImage(line, column, this);
  }
  //impure
  replaceObjects(line, column, piece){
    this.table[this.old_positionY][this.old_positionX] = this.obj_nothing;
    this.table[line][column] = piece;
  }
  isObject(line, column){
    const items = document.getElementsByClassName('row');
    const img = items[line].children[column].getElementsByTagName('img');

    if (typeof img[0] === 'object') {
      return true
    }
    return false
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

    let tmpChoices = Matrix.copyMatrix(piece.calculateChoices(this))
    //todo: this one is bugging the animation
    tmpChoices = Matrix.copyMatrix(this.calculatePossibilityReleaseKingFromCheck(piece, tmpChoices))

    return tmpChoices
  }
  //impure
  undo() {
    let savingChoicesValue = Matrix.copyMatrix(this.choices)

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
    this.choices = Matrix.copyMatrix(savingChoicesValue)
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

    let savingChoicesValue = Matrix.copyMatrix(this.choices)
    this.choices = Matrix.copyMatrix(choices)


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

    let tmp = Matrix.copyMatrix(this.choices)
    this.choices = Matrix.copyMatrix(savingChoicesValue)
    return tmp
  }
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
      return true;
    }
    if (enemyChoices[this.king_black.positionY][this.king_black.positionX] === 1 && this.turn.side === 'black') {
      return true;
    }
    return false;
  }
  calculateEnemySideChoices(king_obj) {
    // create a loop and calculate the choices in each piece

    //just declaring a matrix
    let enemyChoices = Matrix.createMatrix()

    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (this.table[i][j].side === king_obj.other_side) {
          if (this.table[i][j].name !== 'pawn') {
            enemyChoices = Matrix.mergeMatrices(this.table[i][j].calculateChoices(this), enemyChoices)
          }
          if (this.table[i][j].name === 'pawn') {
            enemyChoices = Matrix.mergeMatrices(this.table[i][j].calculateFutureAttack(this), enemyChoices)
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
  isGameFinished(){
    let matrix = Matrix.createMatrix()
    for(let i = 0; i <= 7; i++){
      for(let j = 0; j <= 7; j++){
        if(this.table[i][j].side === this.turn.side){
          matrix = this.calculateChoices(i, j, this.table[i][j])
          if(!Matrix.isJustZeros(matrix)) return false
        }
      }
    }
    console.table(this.choices)
    return true
  }
}