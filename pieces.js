class Piece{
  constructor(name, side){
      this.side = side

      if(this.side === 'black'){
           this.other_side = 'white';
      }
      else{
          this.other_side = 'black';
      }

      this.name = name
      this.positionY = 0
      this.positionX = 0

      this.createMatrix()
  }
  //TODO: change this function
  createMatrix() {
    const matrix = [];
    for (let i = 0; i < 8; i++) {
      matrix.push(new Array(8).fill(0));
    }
    this.matrix = matrix;
  }
  insertPiece(line, column){
      this.positionX = column
      this.positionY = line
      if(line < 0 || line > 7 || column < 0 || column > 7){
          console.log('Tentou inserir o pawn numa posição não existente')
      }
  }

  insertPosition(line, column, board){
      if(board.choices[line][column] === 1  && (this.old_positionY !== line || this.old_positionX !== column)){
          this.positionY = line
          this.positionX = column
          return true
      }
      else{
          console.table(board.choices)
          console.log('Não foi possível mover a peça, fora do range de possibilidades')
          return false
      }
  }
}
class Nothing{
  constructor(){
      this.side = 'aaaa'
      this.name = 'nothing'
  }  
}
class Pawn extends Piece{  
  calculateFutureAttack(board){      //fill the diagonals with 1s
    let tmpChoices = this.matrix

    if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7 && this.side === 'white'){
      tmpChoices[this.positionY - 1][this.positionX + 1] = 1
    }
    if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7 && this.side === 'black'){
      tmpChoices[this.positionY + 1][this.positionX + 1] = 1
    }
    if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0 && this.side === 'white'){
        tmpChoices[this.positionY - 1][this.positionX - 1] = 1
    }
    if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0 && this.side === 'black'){
      tmpChoices[this.positionY + 1][this.positionX - 1] = 1
    }

    return tmpChoices
  }
  calculateAttackChoices(board){
    let tmpChoices = this.matrix
    let opposite_side = this.other_side

    //check if theres a enemy pawn on the diagonal right side
    if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7){
      if(board.table[this.positionY - 1][this.positionX + 1].side === this.other_side && this.side === 'white'){
        tmpChoices[this.positionY - 1][this.positionX + 1] = 1
      }
    }
    if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7){
      if(board.table[this.positionY + 1][this.positionX + 1].side === this.other_side && this.side === 'black'){
        tmpChoices[this.positionY + 1][this.positionX + 1] = 1
      } 
    }
    //check if theres a enemy pawn on the diagonal left side
    if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0){
      if(board.table[this.positionY - 1][this.positionX - 1].side === this.other_side && this.side === 'white'){
        tmpChoices[this.positionY - 1][this.positionX - 1] = 1
      }
    }
    if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0){
      if(board.table[this.positionY + 1][this.positionX - 1].side === this.other_side && this.side === 'black'){
        tmpChoices[this.positionY + 1][this.positionX - 1] = 1
      }
    }

    return tmpChoices
  }
  calculateChoices(board){
    this.createMatrix()
    let tmpChoices = this.calculateAttackChoices(board)

    if(this.side === 'black' && this.positionY === 1){
        if(board.table[this.positionY + 1][this.positionX].name === 'nothing'){
            tmpChoices[this.positionY + 1][this.positionX] = 1
            if(board.table[this.positionY + 2][this.positionX].name === 'nothing'){
              tmpChoices[this.positionY + 2][this.positionX] = 1
            }
        }
    }
    if(this.side === 'white' && this.positionY === 6){
        if(board.table[this.positionY - 1][this.positionX].name === 'nothing'){
            tmpChoices[this.positionY - 1][this.positionX] = 1
            if(board.table[this.positionY - 2][this.positionX].name === 'nothing'){
                tmpChoices[this.positionY - 2][this.positionX] = 1
            }
        }
    }
    else if(this.side === 'black'){
        if(board.table[this.positionY + 1][this.positionX].name === 'nothing'){
            tmpChoices[this.positionY + 1][this.positionX] = 1
        }
    }
    
    else if(this.side === 'white'){
        if(board.table[this.positionY -1][this.positionX].name === 'nothing'){
            tmpChoices[this.positionY - 1][this.positionX] = 1
        }
    }

    return tmpChoices
  }

}
class Rook extends Piece{
  calculateChoices(board){
    this.createMatrix()
    let opposite_side
    let tmpChoices = this.matrix

    if(this.side === 'black'){
      opposite_side = 'white';
    }
    else{
      opposite_side = 'black';
    }
    //Checks the right direction in axis X
    for(let i=this.positionX+1; i <= 7; i++){
      if(board.table[this.positionY][i].name === 'nothing'){
          tmpChoices[this.positionY][i] = 1
      }
      else if(board.table[this.positionY][i].side === opposite_side){
          tmpChoices[this.positionY][i] = 1
          break
      }
      else{
          break
      }
    }
    //Checks the left direction in axis X
    for(let i=this.positionX-1; i >= 0; i--){
      if(board.table[this.positionY][i].name === 'nothing'){
          tmpChoices[this.positionY][i] = 1
      }
      else if(board.table[this.positionY][i].side === opposite_side){
          tmpChoices[this.positionY][i] = 1
          break
      }
      else{
          break
      }
    }
    //Checks the upwards direction in axis Y
    for(let i=this.positionY-1; i >=0 ; i--){
      if(board.table[i][this.positionX].name === 'nothing'){
          tmpChoices[i][this.positionX] = 1
      }
      else if(board.table[i][this.positionX].side === opposite_side){
          tmpChoices[i][this.positionX] = 1
          break
      }
      else{
          break
      }
    }
    //Checks the downwards direction in axis Y
    for(let i=this.positionY+1; i <= 7; i++){
      if(board.table[i][this.positionX].name === 'nothing'){
          tmpChoices[i][this.positionX] = 1
      }
      else if(board.table[i][this.positionX].side === opposite_side){
          tmpChoices[i][this.positionX] = 1
          break
      }
      else{
          break
      }
    }

    return tmpChoices
  }
}
class Knight extends Piece{
  calculateChoices(board){
    this.createMatrix()
    let tmpChoices = this.matrix

    //right side
    if(this.positionY + 1 <= 7 && this.positionX + 2 <= 7){
      if(board.table[this.positionY + 1][ this.positionX + 2].side !== this.side){
          tmpChoices[this.positionY + 1][this.positionX + 2] = 1
      }
    }
    if(this.positionY - 1 >= 0 && this.positionX + 2 <= 7){
      if(board.table[this.positionY - 1][ this.positionX + 2].side !== this.side){
          tmpChoices[this.positionY - 1][ this.positionX + 2] = 1
      }
    }
    if(this.positionY + 2 <= 7 && this.positionX + 1 <= 7){
      if(board.table[this.positionY + 2][ this.positionX + 1].side !== this.side){
          tmpChoices[this.positionY + 2][this.positionX + 1] = 1
      }
    }
    if(this.positionY - 2 >= 0 && this.positionX + 1 <= 7){
      if(board.table[this.positionY - 2][ this.positionX + 1].side !== this.side){
          tmpChoices[this.positionY - 2][this.positionX + 1] = 1
      }
    }
    //left side
    if(this.positionY + 1 <= 7 && this.positionX - 2 >= 0){
      if(board.table[this.positionY + 1][ this.positionX - 2].side !== this.side){
          tmpChoices[this.positionY + 1][this.positionX - 2] = 1
      }
    }
    if(this.positionY - 1 >= 0 && this.positionX - 2 >= 0){
      if(board.table[this.positionY - 1][ this.positionX - 2].side !== this.side){
          tmpChoices[this.positionY - 1][this.positionX - 2] = 1
      }
    }
    if(this.positionY + 2 <= 7 && this.positionX - 1 >= 0){
      if(board.table[this.positionY + 2][ this.positionX - 1].side !== this.side){
          tmpChoices[this.positionY + 2][this.positionX - 1] = 1
      }
    }
    if(this.positionY - 2 >= 0 && this.positionX - 1 >= 0){
      if(board.table[this.positionY - 2][ this.positionX - 1].side !== this.side){
          tmpChoices[this.positionY - 2][this.positionX - 1] = 1
      }
    }

    return tmpChoices
  }
}
class Bishop extends Piece{
  isNothing(board, line, column){
    if(board.table[line][column].name === 'nothing'){
      return true
    }
    else return false
  }
  isEnemy(board, line, column){
    //if finds enemy
    if(board.table[this.positionY][this.positionX].other_side === board.table[line][column].side){
      return true
    }
    else false
  }
  setChoices(board, line, column){
    let tmpChoices = this.matrix

    if(this.isNothing(board, line, column)){
      tmpChoices[line][column] = 1
    }
    if(this.isEnemy(board, line, column)){
      tmpChoices[line][column] = 1
    }

    return tmpChoices
  }
  calculateChoices(board){
    this.createMatrix()
    let tmpChoices = this.matrix

    //Calculate the right-downwards diagonal
    let tmp_column = this.positionX + 1
    let tmp_line = this.positionY + 1
    for(; tmp_column <= 7 && tmp_line <= 7; tmp_column++, tmp_line++){
        tmpChoices = this.setChoices(board, tmp_line, tmp_column)
        if(!this.isNothing(board, tmp_line, tmp_column)){
          break;
        }     
    }

    //Calculate the right-upwards diagonal
    tmp_column = this.positionX + 1
    tmp_line = this.positionY - 1
    for(; tmp_column <= 7 && tmp_line >= 0; tmp_column++, tmp_line--){
      tmpChoices = this.setChoices(board, tmp_line, tmp_column)
      if(!this.isNothing(board, tmp_line, tmp_column)){
        break;
      }     
    }

    //Calculate the left-upwards diagonal
    tmp_column = this.positionX - 1
    tmp_line = this.positionY + 1
    for(; tmp_column >= 0 && tmp_line <= 7; tmp_column--, tmp_line++){
      tmpChoices = this.setChoices(board, tmp_line, tmp_column)
      if(!this.isNothing(board, tmp_line, tmp_column)){
        break;
      }     
    }

    //Calculate the left-downwards diagonal
    tmp_column = this.positionX - 1
    tmp_line = this.positionY - 1
    for(; tmp_column >= 0 && tmp_line >= 0; tmp_column--, tmp_line--){
      tmpChoices = this.setChoices(board, tmp_line, tmp_column)
      if(!this.isNothing(board, tmp_line, tmp_column)){
        break;
      }     
    }

    return tmpChoices
  }
}
class King extends Piece{
  calculateChoices(board){
    this.createMatrix()
    let tmp = this.side
    let tmpChoices = this.matrix

    //right side
    if(this.positionY <= 7 && this.positionX + 1 <= 7){
        if(board.table[this.positionY][ this.positionX + 1].side !== this.side){
            if(board.enemyChoices[this.positionY][ this.positionX + 1] !== 1){
              tmpChoices[this.positionY][this.positionX + 1] = 1
            }
        }
    }
    if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7){
        if(board.table[this.positionY - 1][ this.positionX + 1].side !== this.side){
            if(board.enemyChoices[this.positionY - 1][ this.positionX + 1] !== 1){
              tmpChoices[this.positionY - 1][this.positionX + 1] = 1
            }            
        }
    }
    if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7){
        if(board.table[this.positionY + 1][ this.positionX + 1].side !== this.side){
            if(board.enemyChoices[this.positionY + 1][ this.positionX + 1] !== 1){
              tmpChoices[this.positionY + 1][this.positionX + 1] = 1
            }            
        }
    }
    //upwards side
    if(this.positionY - 1 >= 0 && this.positionX){
        if(board.table[this.positionY - 1][ this.positionX].side !== this.side){
            if(board.enemyChoices[this.positionY - 1][ this.positionX] !== 1){
              tmpChoices[this.positionY - 1][this.positionX] = 1
            }            
        }
    }
    //downwards side
    if(this.positionY + 1 <= 7 && this.positionX){
        if(board.table[this.positionY + 1][ this.positionX ].side !== this.side){
            if(board.enemyChoices[this.positionY + 1][ this.positionX] !== 1){
              tmpChoices[this.positionY + 1][this.positionX] = 1
            }            
        }
    }
    //left side
    if(this.positionY <= 7 && this.positionX - 1 >= 0){
        if(board.table[this.positionY][ this.positionX - 1].side !== this.side){
            if(board.enemyChoices[this.positionY][ this.positionX - 1] !== 1){
              tmpChoices[this.positionY][this.positionX - 1] = 1
            }            
        }
    }
    if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0){
        if(board.table[this.positionY - 1][ this.positionX - 1].side !== this.side){
            if(board.enemyChoices[this.positionY - 1][ this.positionX - 1] !== 1){
              tmpChoices[this.positionY - 1][this.positionX - 1] = 1
            }
        }
    }
    if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0){
        if(board.table[this.positionY + 1][ this.positionX - 1].side !== this.side){
            if(board.enemyChoices[this.positionY + 1][ this.positionX - 1] !== 1){
              tmpChoices[this.positionY + 1][this.positionX - 1] = 1
            }
        }
    }

    return tmpChoices
  }
}
class Queen extends Piece{
  calculateChoices(board){

    let bishop = new Bishop('bishop', this.side)
    let rook = new Rook('rook', this.side)

    bishop.positionX = this.positionX
    rook.positionX = this.positionX
    bishop.positionY = this.positionY
    rook.positionY = this.positionY

    let tmpChoices = bishop.calculateChoices(board)
    let tmpChoices2 = rook.calculateChoices(board)

    //merge the two choices from rook and bishop
    this.merge_matrices(tmpChoices, tmpChoices2)

    return tmpChoices2
  }
  merge_matrices(oldMatrix, newMatrix){
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
           if(oldMatrix[i][j] === 1){
               newMatrix[i][j] = 1
           }
        }
    }
  }
}