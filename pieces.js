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
    }
    insert_piece(line, column){
        this.positionX = column
        this.positionY = line
        if(line < 0 || line > 7 || column < 0 || column > 7){
            console.log('Tentou inserir o pawn numa posição não existente')
        }
    }

    insert_position(line, column, board){
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

    calculate_future_attack(board){      //fill the diagonals with 1s
        if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7 && this.side === 'white'){
                board.choices[this.positionY - 1][this.positionX + 1] = 1
        }
        if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7 && this.side === 'black'){
                board.choices[this.positionY + 1][this.positionX + 1] = 1
        }
        if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0 && this.side === 'white'){
                board.choices[this.positionY - 1][this.positionX - 1] = 1
        }
        if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0 && this.side === 'black'){
                board.choices[this.positionY + 1][this.positionX - 1] = 1
        }
    }
    calculate_attack_choices(board){

        let opposite_side = this.other_side

        //check if theres a enemy pawn on the diagonal right side
        if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7){
            if(board.table[this.positionY - 1][this.positionX + 1].side === this.other_side && this.side === 'white'){
                board.choices[this.positionY - 1][this.positionX + 1] = 1
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY + 1][this.positionX + 1].side === this.other_side && this.side === 'black'){
                board.choices[this.positionY + 1][this.positionX + 1] = 1
            } 
        }
        //check if theres a enemy pawn on the diagonal left side
        if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0){
            if(board.table[this.positionY - 1][this.positionX - 1].side === this.other_side && this.side === 'white'){
                board.choices[this.positionY - 1][this.positionX - 1] = 1
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0){
            if(board.table[this.positionY + 1][this.positionX - 1].side === this.other_side && this.side === 'black'){
                board.choices[this.positionY + 1][this.positionX - 1] = 1
            }
        }
    }
    calculate_choices(board){
        this.calculate_attack_choices(board)

        if(this.side === 'black' && this.positionY === 1){
            if(board.table[this.positionY + 1][this.positionX].name === 'nothing'){
                board.choices[this.positionY + 1][this.positionX] = 1
                if(board.table[this.positionY + 2][this.positionX].name === 'nothing'){
                    board.choices[this.positionY + 2][this.positionX] = 1
                }
            }
        }
        if(this.side === 'white' && this.positionY === 6){
            if(board.table[this.positionY - 1][this.positionX].name === 'nothing'){
                board.choices[this.positionY - 1][this.positionX] = 1
                if(board.table[this.positionY - 2][this.positionX].name === 'nothing'){
                    board.choices[this.positionY - 2][this.positionX] = 1
                }
            }
        }
        else if(this.side === 'black'){
            if(board.table[this.positionY + 1][this.positionX].name === 'nothing'){
                board.choices[this.positionY + 1][this.positionX] = 1
            }
        }
        
        else if(this.side === 'white'){
            if(board.table[this.positionY -1][this.positionX].name === 'nothing'){
                board.choices[this.positionY - 1][this.positionX] = 1
            }
        }


    }

}
class Rook extends Piece{
    calculate_choices(board){
        let opposite_side
        if(this.side === 'black'){
            opposite_side = 'white';
        }
        else{
            opposite_side = 'black';
        }
        //Checks the right direction in axis X
        for(let i=this.positionX+1; i <= 7; i++){
            if(board.table[this.positionY][i].name === 'nothing'){
                board.choices[this.positionY][i] = 1
            }
            else if(board.table[this.positionY][i].side === opposite_side){
                board.choices[this.positionY][i] = 1
                break
            }
            else{
                break
            }
        }
        //Checks the left direction in axis X
        for(let i=this.positionX-1; i >= 0; i--){
            if(board.table[this.positionY][i].name === 'nothing'){
                board.choices[this.positionY][i] = 1
            }
            else if(board.table[this.positionY][i].side === opposite_side){
                board.choices[this.positionY][i] = 1
                break
            }
            else{
                break
            }
        }
        //Checks the upwards direction in axis Y
        for(let i=this.positionY-1; i >=0 ; i--){
            if(board.table[i][this.positionX].name === 'nothing'){
                board.choices[i][this.positionX] = 1
            }
            else if(board.table[i][this.positionX].side === opposite_side){
                board.choices[i][this.positionX] = 1
                break
            }
            else{
                break
            }
        }
        //Checks the downwards direction in axis Y
        for(let i=this.positionY+1; i <= 7; i++){
            if(board.table[i][this.positionX].name === 'nothing'){
                board.choices[i][this.positionX] = 1
            }
            else if(board.table[i][this.positionX].side === opposite_side){
                board.choices[i][this.positionX] = 1
                break
            }
            else{
                break
            }
        }
    }
}
class Knight extends Piece{
    calculate_choices(board){
        //right side
        if(this.positionY + 1 <= 7 && this.positionX + 2 <= 7){
            if(board.table[this.positionY + 1][ this.positionX + 2].side !== this.side){
                board.choices[this.positionY + 1][this.positionX + 2] = 1
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX + 2 <= 7){
            if(board.table[this.positionY - 1][ this.positionX + 2].side !== this.side){
                board.choices[this.positionY - 1][ this.positionX + 2] = 1
            }
        }
        if(this.positionY + 2 <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY + 2][ this.positionX + 1].side !== this.side){
                board.choices[this.positionY + 2][this.positionX + 1] = 1
            }
        }
        if(this.positionY - 2 >= 0 && this.positionX + 1 <= 7){
            if(board.table[this.positionY - 2][ this.positionX + 1].side !== this.side){
                board.choices[this.positionY - 2][this.positionX + 1] = 1
            }
        }
        //left side
        if(this.positionY + 1 <= 7 && this.positionX - 2 >= 0){
            if(board.table[this.positionY + 1][ this.positionX - 2].side !== this.side){
                board.choices[this.positionY + 1][this.positionX - 2] = 1
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX - 2 >= 0){
            if(board.table[this.positionY - 1][ this.positionX - 2].side !== this.side){
                board.choices[this.positionY - 1][this.positionX - 2] = 1
            }
        }
        if(this.positionY + 2 <= 7 && this.positionX - 1 >= 0){
            if(board.table[this.positionY + 2][ this.positionX - 1].side !== this.side){
                board.choices[this.positionY + 2][this.positionX - 1] = 1
            }
        }
        if(this.positionY - 2 >= 0 && this.positionX - 1 >= 0){
            if(board.table[this.positionY - 2][ this.positionX - 1].side !== this.side){
                board.choices[this.positionY - 2][this.positionX - 1] = 1
            }
        }
    }
}
class Bishop extends Piece{
    set_choices(board, line, column){
        if(board.table[line][column].name === 'nothing'){
            board.choices[line][column] = 1
            return false
        }
        //if finds enemy
        else if(board.table[this.positionY][this.positionX].other_side === board.table[line][column].side){
            board.choices[line][column] = 1
            return true
        }
        else return true
    }
    calculate_choices(board){
        //Calculate the right-downwards diagonal
        let tmp_column = this.positionX + 1
        let tmp_line = this.positionY + 1
        for(; tmp_column <= 7 && tmp_line <= 7; tmp_column++, tmp_line++){
            if(this.set_choices(board, tmp_line, tmp_column)) break;
            
        }

        //Calculate the right-upwards diagonal
        tmp_column = this.positionX + 1
        tmp_line = this.positionY - 1
        for(; tmp_column <= 7 && tmp_line >= 0; tmp_column++, tmp_line--){
            if(this.set_choices(board, tmp_line, tmp_column)) break;
        }

        //Calculate the left-upwards diagonal
        tmp_column = this.positionX - 1
        tmp_line = this.positionY + 1
        for(; tmp_column >= 0 && tmp_line <= 7; tmp_column--, tmp_line++){
            if(this.set_choices(board, tmp_line, tmp_column)) break;
        }

        //Calculate the left-downwards diagonal
        tmp_column = this.positionX - 1
        tmp_line = this.positionY - 1
        for(; tmp_column >= 0 && tmp_line >= 0; tmp_column--, tmp_line--){
            if(this.set_choices(board, tmp_line, tmp_column)) break;
        }
    }
}
class King extends Piece{
    calculate_choices(board){
        let tmp = this.side

        //right side
        if(this.positionY <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY][ this.positionX + 1].side !== this.side){
                if(board.enemy_choices[this.positionY][ this.positionX + 1] !== 1){
                    board.choices[this.positionY][this.positionX + 1] = 1
                }
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7){
            if(board.table[this.positionY - 1][ this.positionX + 1].side !== this.side){
                if(board.enemy_choices[this.positionY - 1][ this.positionX + 1] !== 1){
                    board.choices[this.positionY - 1][this.positionX + 1] = 1
                }            
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY + 1][ this.positionX + 1].side !== this.side){
                if(board.enemy_choices[this.positionY + 1][ this.positionX + 1] !== 1){
                    board.choices[this.positionY + 1][this.positionX + 1] = 1
                }            
            }
        }
        //upwards side
        if(this.positionY - 1 >= 0 && this.positionX){
            if(board.table[this.positionY - 1][ this.positionX].side !== this.side){
                if(board.enemy_choices[this.positionY - 1][ this.positionX] !== 1){
                    board.choices[this.positionY - 1][this.positionX] = 1
                }            
            }
        }
        //downwards side
        if(this.positionY + 1 <= 7 && this.positionX){
            if(board.table[this.positionY + 1][ this.positionX ].side !== this.side){
                if(board.enemy_choices[this.positionY + 1][ this.positionX] !== 1){
                    board.choices[this.positionY + 1][this.positionX] = 1
                }            
            }
        }
        //left side
        if(this.positionY <= 7 && this.positionX - 1 >= 0){
            if(board.table[this.positionY][ this.positionX - 1].side !== this.side){
                if(board.enemy_choices[this.positionY][ this.positionX - 1] !== 1){
                    board.choices[this.positionY][this.positionX - 1] = 1
                }            
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0){
            if(board.table[this.positionY - 1][ this.positionX - 1].side !== this.side){
                if(board.enemy_choices[this.positionY - 1][ this.positionX - 1] !== 1){
                    board.choices[this.positionY - 1][this.positionX - 1] = 1
                }
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0){
            if(board.table[this.positionY + 1][ this.positionX - 1].side !== this.side){
                if(board.enemy_choices[this.positionY + 1][ this.positionX - 1] !== 1){
                    board.choices[this.positionY + 1][this.positionX - 1] = 1
                }
            }
        }
    }
}
class Queen extends Piece{
    calculate_choices(board){
        this.bishop = new Bishop('bishop', this.side)
        this.rook = new Rook('rook', this.side)
        
        this.bishop.insert_piece(this.positionY, this.positionX)
        this.rook.insert_piece(this.positionY, this.positionX)

        this.bishop.calculate_choices(board)
        this.rook.calculate_choices(board)
    }
}