class Piece{
    constructor(name){
        this.name = name
        this.positionY = 0
        this.positionX = 0
        this.create_matrix()
    }
    create_matrix(){
        let choices = []
        for(let i = 0; i < 8 ; i++){
            choices.push(new Array(8).fill(0))
        }
        this.choices = choices

    }
    insert_piece(line, column){
        this.positionX = column
        this.positionY = line
        if(line <= 0 || line > 7 || column <= 0 || column > 7){
            console.log('Tentou inserir o pawn numa posição não existente')
        }
    }

    insert_position(line, column, board){
        console.log('Function insert_position() called')
        this.calculate_choices(board)
 
        if(this.choices[line][column] === 1){
            this.positionY = line
            this.positionX = column
            console.log(' ')
            return true
        }
        else{
            console.log('Não foi possível mover a peça, fora do range de possibilidades')
            return false
        }
    }
    print_choices(){
        console.log('Tabela de escolhas do ' + this.name)
        console.table(this.choices)
    }
}
class Pawn extends Piece{

    calculate_attack_choices(board){
        console.log('Pawn calculate_attack_choices() called')

        let tmp = 'okok'
        if(this.name.substring(0, 4) === 'DOWN'){
            tmp = 'TOP_'
        }
        else{
            tmp = 'DOWN'
        }

        console.log(this.positionY + " " + this.positionX)

        //check if theres a enemy pawn on the diagonal right side
        if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7){
            if(board.table[this.positionY - 1][this.positionX + 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'DOWN'){
                this.choices[this.positionY - 1][this.positionX + 1] = 1
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY + 1][this.positionX + 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'TOP_'){
                this.choices[this.positionY + 1][this.positionX + 1] = 1
            } 
        }
        //check if theres a enemy pawn on the diagonal left side
        if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0){
            if(board.table[this.positionY - 1][this.positionX - 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'DOWN'){
                this.choices[this.positionY - 1][this.positionX - 1] = 1
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0){
            if(board.table[this.positionY + 1][this.positionX - 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'TOP_'){
                this.choices[this.positionY + 1][this.positionX - 1] = 1
            }
        }
    }
    calculate_choices(board){
        this.calculate_attack_choices(board)

        if(this.name.substring(4, 0) === 'TOP_' && this.positionY === 1){
            if(board.table[this.positionY + 1][this.positionX] === 'aaaa'){
                this.choices[this.positionY + 1][this.positionX] = 1
            }
            if(board.table[this.positionY + 2][this.positionX] === 'aaaa'){
                this.choices[this.positionY + 2][this.positionX] = 1
            }
        }
        if(this.name.substring(4, 0) === 'DOWN' && this.positionY === 6){
            if(board.table[this.positionY - 1][this.positionX] === 'aaaa'){
                this.choices[this.positionY - 1][this.positionX] = 1
            }
            if(board.table[this.positionY - 2][this.positionX] === 'aaaa'){
                this.choices[this.positionY - 2][this.positionX] = 1
            }
        }
        else if(this.name.substring(4, 0) === 'TOP_'){
            if(board.table[this.positionY + 1][this.positionX] === 'aaaa'){
                this.choices[this.positionY + 1][this.positionX] = 1
            }
        }
        else if(this.name.substring(4, 0) === 'DOWN'){
            if(board.table[this.positionY -1][this.positionX] === 'aaaa'){
                this.choices[this.positionY - 1][this.positionX] = 1
            }
        }


    }

}
class Rook extends Piece{

    calculate_choices(board){
        //See wich side is the piece and save the opposite of it in tmp
        let tmp = 'ok'
        if(this.name.substring(0, 4) === "DOWN"){
             tmp = "TOP_";
        }
        else{
            tmp = "DOWN";
        }

        //Checks the right direction in axis X
        for(let i=this.positionX+1; i <= 7; i++){
            if(board.table[this.positionY][i] === 'aaaa'){
                this.choices[this.positionY][i] = 1
            }
            else if(board.table[this.positionY][i].substring(0, 4) === tmp){
                this.choices[this.positionY][i] = 1
                break
            }
            else{
                break
            }
        }
        //Checks the left direction in axis X
        for(let i=this.positionX-1; i >= 0; i--){
            if(board.table[this.positionY][i] === 'aaaa'){
                this.choices[this.positionY][i] = 1
            }
            else if(board.table[this.positionY][i].substring(0, 4) === tmp){
                this.choices[this.positionY][i] = 1
                break
            }
            else{
                break
            }
        }
        //Checks the upwards direction in axis Y
        for(let i=this.positionY-1; i >=0 ; i--){
            if(board.table[i][this.positionX] === 'aaaa'){
                this.choices[i][this.positionX] = 1
            }
            else if(board.table[i][this.positionX].substring(0, 4) === tmp){
                this.choices[i][this.positionX] = 1
                break
            }
            else{
                break
            }
        }
        //Checks the downwards direction in axis Y
        for(let i=this.positionY+1; i <= 7; i++){
            if(board.table[i][this.positionX] === 'aaaa'){
                this.choices[i][this.positionX] = 1
            }
            else if(board.table[i][this.positionX].substring(0, 4) === tmp){
                this.choices[i][this.positionX] = 1
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
        let tmp = this.name.substring(0, 4)
        console.log(tmp + 'lalalal')
        //right side
        if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY + 1][ this.positionX + 2].substring(0, 4) !== tmp){
                this.choices[this.positionY + 1][this.positionX + 2] = 1
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX + 2 <= 7){
            if(board.table[this.positionY - 1][ this.positionX + 2].substring(0, 4) !== tmp){
                this.choices[this.positionY - 1][ this.positionX + 2] = 1
            }
        }
        if(this.positionY + 2 <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY + 2][ this.positionX + 1].substring(0, 4) !== tmp){
                this.choices[this.positionY + 2][this.positionX + 1] = 1
            }
        }
        if(this.positionY - 2 >= 0 && this.positionX + 1 <= 7){
            if(board.table[this.positionY - 2][ this.positionX + 1].substring(0, 4) !== tmp){
                this.choices[this.positionY - 2][this.positionX + 1] = 1
            }
        }
        //left side
        if(this.positionY + 1 <= 7 && this.positionX - 2 >= 0){
            if(board.table[this.positionY + 1][ this.positionX - 2].substring(0, 4) !== tmp){
                this.choices[this.positionY + 1][this.positionX - 2] = 1
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX - 2 >= 0){
            if(board.table[this.positionY - 1][ this.positionX - 2].substring(0, 4) !== tmp){
                this.choices[this.positionY - 1][this.positionX - 2] = 1
            }
        }
        if(this.positionY + 2 <= 7 && this.positionX - 1 >= 0){
            if(board.table[this.positionY + 2][ this.positionX - 1].substring(0, 4) !== tmp){
                this.choices[this.positionY + 2][this.positionX - 1] = 1
            }
        }
        if(this.positionY - 2 >= 0 && this.positionX - 1 >= 0){
            if(board.table[this.positionY - 2][ this.positionX - 1].substring(0, 4) !== tmp){
                this.choices[this.positionY - 2][this.positionX - 1] = 1
            }
        }
    }
}
class Bishop extends Piece{
    calculate_choices(board){
        let tmp = 'ok'
        if(this.name.substring(0, 4) === "DOWN"){
             tmp = "TOP_";
        }
        else{
            tmp = "DOWN";
        }
        //Calculate the right-downwards diagonal
        let tmp_column = this.positionX + 1
        let tmp_line = this.positionY + 1
        for(; tmp_column <= 7 && tmp_line <= 7; tmp_column++, tmp_line++){
            if(board.table[tmp_line][tmp_column].substring(0, 4) === 'aaaa'){
                this.choices[tmp_line][tmp_column] = 1
            }
            //if find enemy
            else if(board.table[tmp_line][tmp_column].substring(0, 4) === tmp){
                this.choices[tmp_line][tmp_column] = 1
                break
            }
            else break
        }
       //Calculate the right-upwards diagonal
       tmp_column = this.positionX + 1
       tmp_line = this.positionY - 1
       for(; tmp_column <= 7 && tmp_line >= 0; tmp_column++, tmp_line--){
            if(board.table[tmp_line][tmp_column].substring(0, 4) === 'aaaa'){
                this.choices[tmp_line][tmp_column] = 1
            }
            //if find enemy
            else if(board.table[tmp_line][tmp_column].substring(0, 4) === tmp){
                this.choices[tmp_line][tmp_column] = 1
                break
            }
            else break
       }
       //Calculate the left-upwards diagonal
       tmp_column = this.positionX - 1
       tmp_line = this.positionY + 1
       for(; tmp_column >= 0 && tmp_line <= 7; tmp_column--, tmp_line++){
            if(board.table[tmp_line][tmp_column].substring(0, 4) === 'aaaa'){
                this.choices[tmp_line][tmp_column] = 1
            }
            //if find enemy
            else if(board.table[tmp_line][tmp_column].substring(0, 4) === tmp){
                this.choices[tmp_line][tmp_column] = 1
                break
            }
            else break
       }
       //Calculate the left-downwards diagonal
       tmp_column = this.positionX - 1
       tmp_line = this.positionY - 1
       for(; tmp_column >= 0 && tmp_line >= 0; tmp_column--, tmp_line--){
            if(board.table[tmp_line][tmp_column].substring(0, 4) === 'aaaa'){
                this.choices[tmp_line][tmp_column] = 1
            }
            //if find enemy
            else if(board.table[tmp_line][tmp_column].substring(0, 4) === tmp){
                this.choices[tmp_line][tmp_column] = 1
                break
            }
            else break
       }                  
    }
}
class King extends Piece{
    calculate_choices(board){
        let tmp = this.name.substring(0, 4)
        //right side
        if(this.positionY && this.positionX + 1 <= 7){
            if(board.table[this.positionY][ this.positionX + 1].substring(0, 4) !== tmp){
                this.choices[this.positionY][this.positionX + 1] = 1
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX + 1 <= 7){
            if(board.table[this.positionY - 1][ this.positionX + 1].substring(0, 4) !== tmp){
                this.choices[this.positionY - 1][this.positionX + 1] = 1
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX + 1 <= 7){
            if(board.table[this.positionY + 1][ this.positionX + 1].substring(0, 4) !== tmp){
                this.choices[this.positionY + 1][this.positionX + 1] = 1
            }
        }
        //upwards side
        if(this.positionY - 1 >= 0 && this.positionX){
            if(board.table[this.positionY - 1][ this.positionX].substring(0, 4) !== tmp){
                this.choices[this.positionY - 1][this.positionX] = 1
            }
        }
        //downwards side
        if(this.positionY + 1 <= 7 && this.positionX){
            if(board.table[this.positionY + 1][ this.positionX ].substring(0, 4) !== tmp){
                this.choices[this.positionY + 1][this.positionX ] = 1
            }
        }
        //left side
        if(this.positionY && this.positionX - 1 >= 0){
            if(board.table[this.positionY][ this.positionX - 1].substring(0, 4) !== tmp){
                this.choices[this.positionY][this.positionX - 1] = 1
            }
        }
        if(this.positionY - 1 >= 0 && this.positionX - 1 >= 0){
            if(board.table[this.positionY - 1][ this.positionX - 1].substring(0, 4) !== tmp){
                this.choices[this.positionY - 1][this.positionX - 1] = 1
            }
        }
        if(this.positionY + 1 <= 7 && this.positionX - 1 >= 0){
            if(board.table[this.positionY + 1][ this.positionX - 1].substring(0, 4) !== tmp){
                this.choices[this.positionY + 1][this.positionX - 1] = 1
            }
        }
    }
}
class Queen extends Piece{
    constructor(name){
        super(name)
        this.bishop = new Bishop('TOP_bishop')
        this.rook = new Rook('TOP_rook')
    }
    calculate_choices(board){
        this.bishop.insert_piece(this.positionY, this.positionX)
        this.rook.insert_piece(this.positionY, this.positionX)

        this.bishop.calculate_choices(board)
        this.choices = this.bishop.choices
        this.rook.calculate_choices(board)
        this.merge_matrices()

        //fill matrices with zeros again
        this.bishop.create_matrix()
        this.rook.create_matrix()
    }
    merge_matrices(){
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
               if(this.rook.choices[i][j] === 1){
                   this.choices[i][j] = 1
               }
            }
        }
    }
}
class Board{
    constructor(){
        this.deaths_quantity = 0
        this.create_matrix()
    }
    create_matrix(){
        let table = []
        for(let i = 0; i < 8 ; i++){
            table.push(new Array(8).fill('aaaa'))
        }
        this.table = table
    }

    insert_piece(line, column, piece){
        this.table[line][column] = piece.name
        piece.insert_piece(line, column)
    }
    insert_position(line, column, piece, board){
        let tmp = piece.positionX
        let tmp2 = piece.positionY
        if(piece.insert_position(line, column, board) && (tmp2 !== line || tmp !== column)){
            this.table[line][column] = piece.name
            this.table[tmp2][tmp] = 'aaaa'
        }
        piece.create_matrix()
        console.log(' ')
    }
    check_position(line, column){
        if(this.table[line][column] !== 'aaaa'){
            console.log('This position is occupied, line '+ line + ' column ' + column)
            return true
        }
        else{
            return false
        }
    }
    print_board(){
        console.table(this.table)
    }
    fulfil_html(){
        let items = document.getElementsByClassName('row')
        let DOM_img = document.createElement("img");
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if(this.table[i][j] !== 'aaaa'){
                    
                    if(this.table[i][j] === 'TOP_King'){
                        DOM_img.src = "./images/black_king.png"
                    }
                    items[i].children[j].appendChild(DOM_img)
                }
            }
        }
    }

}
const piece1 = new Piece()
const board1 = new Board()
const king1 = new King('TOP_King')
const pawn1 = new Pawn('TOP_Pawn1')
const pawn2 = new Pawn('TOP_Pawn2')
const rook1 = new Rook('TOP_Rook1')
const queen1 = new Queen('TOP_Queen1')
const enemy_rook1 = new Rook('DOWN_Rook1')
const enemy_rook2 = new Rook('DOWN_Rook2')
const enemy_pawn1 = new Pawn('DOWN_Pawn1')
const knight1 = new Knight('TOP_Knight1')
const bishop1 = new Bishop('TOP_Bishop1')

//insert_position(line, column)
board1.insert_piece(2, 1, king1)

board1.print_board()

board1.fulfil_html()
