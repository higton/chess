class Pawn{
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
    empty_matrix(){
        choices.length = 0
    }
    insert_piece(line, column){
        this.positionX = column
        this.positionY = line
        if(line <= 0 || line > 7 || column <= 0 || column > 7){
            console.log('Tentou inserir o pawn numa posição não existente')
        }
    }
    attack(line, column, board){
        console.log('Pawn function attack() called')
        console.log('side1 ' + this.actual_piece_side + ' side2 ' + this.future_piece_side + ' positionX ' + this.positionX + ' positionY ' + this.positionY)
        if( (this.actual_piece_side === 'DOWN' && this.future_piece_side === 'TOP_') || (this.actual_piece_side === 'TOP_' && this.future_piece_side === 'DOWN')){
            this.positionX = column
            this.positionY = line
            board.table[line][column] = this.name
            console.log('Pawn attacked in line ' + line + ' column ' + column)
            return true
        }
        else{
            return false
        }
    }
    check_attack_possibility(line, column, board){
        console.log('Pawn check_attack_possibility() called')
        if(1 === line - this.positionY && ( column - this.positionX === 1 || column - this.positionX === -1)){
            console.log('Pawn wants to attack')
            if(this.attack(line, column, board)){
                return true
            }
            else{
                return false
            }
        }
    }
    insert_position(line, column, board){
        console.log('Pawn, function insert_position() called')
        this.future_piece_side = board.table[line][column].substring(0, 4)
        this.actual_piece_side = board.table[this.positionY][this.positionX].substring(0, 4)

        if(this.check_attack_possibility(line, column, board)) return true
        if(this.actual_piece_side === 'TOP_' && this.positionY === 1){
            if(board.table[this.positionY + 1][this.positionX] === 'aaaa'){
                this.choices[this.positionY + 1][this.positionX] = 1
            }
            if(board.table[this.positionY + 2][this.positionX] === 'aaaa'){
                this.choices[this.positionY + 2][this.positionX] = 1
            }
        }
        if(this.actual_piece_side === 'DOWN' && this.positionY === 6){
            if(board.table[this.positionY - 1][this.positionX] === 'aaaa'){
                this.choices[this.positionY - 1][this.positionX] = 1
            }
            if(board.table[this.positionY - 2][this.positionX] === 'aaaa'){
                this.choices[this.positionY - 2][this.positionX] = 1
            }
        }
        else if(this.actual_piece_side === 'TOP_'){
            if(board.table[this.positionY + 1][this.positionX] === 'aaaa'){
                this.choices[this.positionY + 1][this.positionX] = 1
            }
        }
        else if(this.actual_piece_side === 'DOWN'){
            if(board.table[this.positionY -1][this.positionX] === 'aaaa'){
                this.choices[this.positionY - 1][this.positionX] = 1
            }
        }
        if(this.choices[line][column] === 1){
            this.create_matrix()
            this.positionY = line
            this.positionX = column
            console.log(' ')
            return true
        }
        else{
            this.create_matrix()
            console.log('Não foi possível mover a peça, fora do range de possibilidades')
            return false
        }
    }
}
class Rook{
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
    empty_matrix(){
        choices.length = 0
    }
    insert_piece(line, column){
        this.positionX = column
        this.positionY = line
        if(line <= 0 || line > 7 || column <= 0 || column > 7){
            console.log('Tentou inserir o pawn numa posição não existente')
        }
    }
    calculate_choices(line, column, board){
        //See wich side is the piece and save the opposite of it in tmp
        let tmp = 'ok'
        if(this.name === "DOWN"){
             tmp = "TOP_Rook";
        }
        else{
            tmp = "DOWN_Rook";
        }
        console.log(tmp + ' okok lolol')
        //Checks the right direction in axis X
        for(let i=this.positionX+1; i <= 8; i++){
            if(board.table[this.positionY][i] === 'aaaa'){
                this.choices[this.positionY][i] = 1
            }
            else if(board.table[this.positionY][i] === tmp){
                this.choices[this.positionY][i] = 1
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
            else if(board.table[this.positionY][i] === tmp){
                this.choices[this.positionY][i] = 1
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
            else if(board.table[this.positionY][i] === tmp){
                this.choices[this.positionY][i] = 1
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
            else if(board.table[this.positionY][i] === tmp){
                this.choices[this.positionY][i] = 1
            }
            else{
                break
            }
        }
    }
    insert_position(line, column, board){
        console.log('Pawn, function insert_position() called')
        this.future_piece_side = board.table[line][column].substring(0, 4)
        this.actual_piece_side = board.table[this.positionY][this.positionX].substring(0, 4)
        
        this.calculate_choices(line, column, board)

        console.table(this.choices)
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

}

const board1 = new Board()
const pawn1 = new Pawn('TOP_Pawn')
const pawn2 = new Pawn('TOP_Pawn')
const rook1 = new Rook('TOP_Rook')
const enemy_rook1 = new Rook('DOWN_Rook')
const enemy_pawn1 = new Pawn('DOWN_Pawn')
//insert_position(line, column)
/* board1.insert_piece(1, 1, pawn1)
board1.insert_piece(2, 1, pawn2) */
board1.insert_piece(2, 1, rook1)
board1.insert_piece(0, 0, enemy_rook1)

board1.insert_position(3, 1, rook1, board1)
board1.insert_position(3, 3, rook1, board1)
board1.insert_position(0, 3, rook1, board1)
board1.insert_position(0, 0, rook1, board1)

console.log(' ')


/* board1.insert_position(4, 2, enemy_pawn1, board1)
board1.insert_position(6, 2, enemy_pawn1, board1) */

board1.print_board()