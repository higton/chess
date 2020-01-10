
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
    this.create_matrix_table();
    this.create_matrix_choices();
    this.enemy_choices = this.choices;
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

    this.insert_piece(7, 4, this.king_white);
    this.insert_piece(0, 4, this.king_black);
    this.insert_piece(7, 2, this.bishop_white1);
    this.insert_piece(7, 5, this.bishop_white2);
    this.insert_piece(0, 2, this.bishop_black1);
    this.insert_piece(0, 5, this.bishop_black2);
    this.insert_piece(7, 1, this.knight_white1);
    this.insert_piece(7, 6, this.knight_white2);
    this.insert_piece(0, 1, this.knight_black1);
    this.insert_piece(0, 6, this.knight_black2);
    this.insert_piece(7, 0, this.rook_white1);
    this.insert_piece(7, 7, this.rook_white2);
    this.insert_piece(0, 0, this.rook_black1);
    this.insert_piece(0, 7, this.rook_black2);
    this.insert_piece(1, 0, this.pawn_black1);
    this.insert_piece(1, 1, this.pawn_black2);
    this.insert_piece(1, 2, this.pawn_black3);
    this.insert_piece(1, 3, this.pawn_black4);
    this.insert_piece(1, 4, this.pawn_black5);
    this.insert_piece(1, 5, this.pawn_black6);
    this.insert_piece(1, 6, this.pawn_black7);
    this.insert_piece(1, 7, this.pawn_black8);
    this.insert_piece(6, 0, this.pawn_white1);
    this.insert_piece(6, 1, this.pawn_white2);
    this.insert_piece(6, 2, this.pawn_white3);
    this.insert_piece(6, 3, this.pawn_white4);
    this.insert_piece(6, 4, this.pawn_white5);
    this.insert_piece(6, 5, this.pawn_white6);
    this.insert_piece(6, 6, this.pawn_white7);
    this.insert_piece(6, 7, this.pawn_white8);
    this.insert_piece(7, 3, this.queen_white);
    this.insert_piece(0, 3, this.queen_black);
  }

  create_matrix_choices() {
    const choices = [];
    for (let i = 0; i < 8; i++) {
      choices.push(new Array(8).fill(0));
    }
    this.choices = choices;
  }

  create_matrix_table() {
    const table = [];
    for (let i = 0; i < 8; i++) {
      table.push(new Array(8).fill(this.obj_nothing));
    }
    this.table = table;
  }

  insert_piece(line, column, piece) {
    this.table[line][column] = piece;
    piece.insert_piece(line, column);
    this.dom.insert_image(line, column, this);
  }

  insert_position(line, column, piece) {
    console.log(
      `Function insert_position() called in board, line: ${line} column ${column} piece.name  ${piece.name}`,
    );
    this.old_object = 0;

    this.old_positionX = piece.positionX;
    this.old_positionY = piece.positionY;
    this.actual_object = piece;

    if (piece.insert_position(line, column, this)) {
      // remove images from the actual position
      if (this.dom.remove_image(line, column)) {
        this.old_object = this.table[line][column];
        this.add_death_score(this.table[line][column]);
      }
      // remove images from the past
      this.dom.remove_image(this.old_positionY, this.old_positionX);

      // replace objects
      this.table[this.old_positionY][this.old_positionX] = this.obj_nothing;
      this.table[line][column] = piece;

      // insert image in the actual position
      this.dom.insert_image(line, column, this);
    }

    this.create_matrix_choices();
  }

  calculate_choices(line, column, piece) {
    console.log('Function calculate_choices called');
    // calculate choices that will see if the king can move
    if (piece.name === 'king') {
      this.table[line][column] = this.obj_nothing;
      this.calculate_enemy_side_choices(piece);
      this.table[line][column] = piece;
    }
    piece.calculate_choices(this);

    if (this.turn.side === 'white') {
      this.choices = this.calculate_possibility_release_king_from_check(piece);
    } else if (this.turn.side === 'black') {
      this.choices = this.calculate_possibility_release_king_from_check(piece);
    }
    this.isGameFinished()
  }

  isGameFinished(){
    if(this.isChoicesJustZeros()) console.log("true")
    else  console.log("false")

    debugger
  }

  isChoicesJustZeros(){
    let isAllZero = true
    for(let i = 0; i <= 7; i++){
      for(let j = 0; j <= 7; j++){
        if(this.choices[i][j] !== 0){
          isAllZero = false
          break;
        }
      }
    }
    return isAllZero
  }

  undo() {
    const tmp = this.old_object;

    this.choices[this.old_positionY][this.old_positionX] = 1;
    this.insert_position(
      this.old_positionY,
      this.old_positionX,
      this.actual_object,
    );
    this.choices[this.old_positionY][this.old_positionX] = 0;

    // if theres an object attacked, will return to his position
    if (typeof tmp === 'object') {
      this.choices[tmp.positionY][tmp.positionX] = 1;
      this.insert_position(tmp.positionY, tmp.positionX, tmp);
      this.choices[tmp.positionY][tmp.positionX] = 1;

      this.revert_score(tmp);
    }
  }

  revert_score(tmp) {
    // try fixing the score
    if (tmp.side === 'black' && this.number_black_pieces_dead > 0) {
      this.number_black_pieces_dead -= 1;
    } else if (tmp.side === 'white' && this.number_white_pieces_dead > 0) {
      this.number_white_pieces_dead -= 1;
    }
  }

  calculate_possibility_release_king_from_check(piece) {
    console.log(
      'Function calculate_possibility_release_king_from_check() was called',
    );
    const tmp = this.choices;
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (tmp[i][j] === 1) {
          this.choices = tmp;
          this.insert_position(i, j, piece);
          if (this.isKingInCheck()) {
            tmp[i][j] = 0;
          }
          this.undo();
        }
      }
    }
    return tmp;
  }

  // return true if the king is in check
  isKingInCheck() {
    console.log('Function isKingInCheck() called');
    if (this.turn.side === 'black') {
      this.calculate_enemy_side_choices(this.king_black);
    }
    if (this.turn.side === 'white') {
      this.calculate_enemy_side_choices(this.king_white);
    }

    if (
      this.enemy_choices[this.king_white.positionY][
        this.king_white.positionX
      ] === 1
        && this.turn.side === 'white'
    ) {
      console.log('okidoki');
      this.create_matrix_choices();
      this.dom.change_background('red');
      this.white_king_in_check = true;
      return true;
    }
    if (
      this.enemy_choices[this.king_black.positionY][
        this.king_black.positionX
      ] === 1
        && this.turn.side === 'black'
    ) {
      console.log('okidoki');
      this.create_matrix_choices();
      this.dom.change_background('darkred');
      this.black_king_in_check = true;
      return true;
    }
    this.dom.change_background('white');
    this.create_matrix_choices();
    this.black_king_in_check = false;
    this.white_king_in_check = false;

    return false;
  }

  calculate_enemy_side_choices(king_obj) {
    // create a loop and calculate the choices in each piece
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        if (this.table[i][j].side === king_obj.other_side) {
          if (this.table[i][j].name !== 'pawn') {
            this.table[i][j].calculate_choices(this);
          }
          if (this.table[i][j].name === 'pawn') {
            this.table[i][j].calculate_future_attack(this);
          }
        }
      }
    }
    this.enemy_choices = this.choices;
    this.create_matrix_choices();
  }

  add_death_score(piece) {
    if (piece.side === 'white') {
      this.white_pieces_dead[this.number_white_pieces_dead] = piece;
      this.number_white_pieces_dead += 1;
    } else if (piece.side === 'black') {
      this.black_pieces_dead[this.number_black_pieces_dead] = piece;
      this.number_black_pieces_dead += 1;
    }
  }
}
/* class History{
      constructor(){
          this.movements = []
          this.counter = 0
      }
      add_piece_movement(line, column){

      }
      add_piece_death()

      remove_last_piece_movement()

  } */
