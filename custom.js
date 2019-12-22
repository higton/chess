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
    calculate_attack_choices(board){
        console.log('Pawn calculate_attack_choices() called')

        let tmp = 'okok'
        if(this.name.substring(0, 4) === 'DOWN'){
            tmp = 'TOP_'
        }
        else{
            tmp = 'DOWN'
        }
        console.log(tmp + ' okok lolol')

         //check if theres a enemy pawn on the diagonal right side
        if(board.table[this.positionY - 1][this.positionX + 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'DOWN_'){
            this.choices[this.positionY - 1][this.positionX + 1] = 1
        }
        if(board.table[this.positionY + 1][this.positionX + 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'TOP_'){
            this.choices[this.positionY + 1][this.positionX + 1] = 1
        } 
    
    //check if theres a enemy pawn on the diagonal left side
        if(board.table[this.positionY - 1][this.positionX - 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'DOWN_'){
            this.choices[this.positionY - 1][this.positionX - 1] = 1
        }
        if(board.table[this.positionY + 1][this.positionX - 1].substring(0, 4) === tmp && this.name.substring(0, 4) === 'TOP_'){
            this.choices[this.positionY + 1][this.positionX - 1] = 1
        }
    }
    calculate_choices(board){
        this.calculate_attack_choices(board)

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
    }
    insert_position(line, column, board){
        console.log('Pawn, function insert_position() called')
        this.future_piece_side = board.table[line][column].substring(0, 4)
        this.actual_piece_side = board.table[this.positionY][this.positionX].substring(0, 4)

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
    calculate_choices(board){
        //See wich side is the piece and save the opposite of it in tmp
        let tmp = 'ok'
        if(this.name.substring(0, 4) === "DOWN"){
             tmp = "TOP_";
        }
        else{
            tmp = "DOWN";
        }
        console.log(tmp + ' okok lolol')
        //Checks the right direction in axis X
        for(let i=this.positionX+1; i <= 8; i++){
            if(board.table[this.positionY][i] === 'aaaa'){
                this.choices[this.positionY][i] = 1
            }
            else if(board.table[this.positionY][i].substring(0, 4) === tmp){
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
            else if(board.table[this.positionY][i].substring(0, 4) === tmp){
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
            else if(board.table[i][this.positionX].substring(0, 4) === tmp){
                this.choices[i][this.positionX] = 1
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
    print_choices(){
        console.log('Tabela de escolhas do ' + this.name)
        console.table(this.choices)
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

}

const board1 = new Board()
const pawn1 = new Pawn('TOP_Pawn')
const pawn2 = new Pawn('TOP_Pawn')
const rook1 = new Rook('TOP_Rook')
const enemy_rook1 = new Rook('DOWN_Rook')
const enemy_rook2 = new Rook('DOWN_Rook')
const enemy_pawn1 = new Pawn('DOWN_Pawn')
//insert_position(line, column)
board1.insert_piece(1, 1, pawn1)
board1.insert_piece(6, 2, enemy_pawn1)
/* board1.insert_piece(1, 1, pawn1)
board1.insert_piece(6, 2, enemy_pawn1) */

board1.insert_position(3, 1, pawn1, board1)
board1.insert_position(4, 1, pawn1, board1)
board1.insert_position(5, 1, pawn1, board1)
board1.insert_piece(6, 1, enemy_rook1, board1)


pawn1.calculate_choices(board1)
pawn1.print_choices()
enemy_rook1.calculate_choices(board1)
enemy_rook1.print_choices()

board1.print_board()