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
        if(board.choices[line][column] === 1){
            this.positionY = line
            this.positionX = column
            return true
        }
        else{
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
class Board{
    constructor(){
        let nothing = new Nothing()
        this.obj_nothing = nothing

        this.white_side_points = 0
        this.black_side_points = 0
        this.white_pieces_dead = []
        this.black_pieces_dead = []
        this.number_black_pieces_dead = 0
        this.number_white_pieces_dead = 0
        this.actual_object
        this.create_matrix_table()
        this.create_matrix_choices()
        this.enemy_choices = this.choices
    }
    create_matrix_choices(){
        let choices = []
        for(let i = 0; i < 8 ; i++){
            choices.push(new Array(8).fill(0))
        }
        this.choices = choices
    }
    
    create_matrix_table(){
        let table = []
        for(let i = 0; i < 8 ; i++){
            table.push(new Array(8).fill(this.obj_nothing))
        }
        this.table = table
    }

    insert_piece(line, column, piece){
        this.table[line][column] = piece
        piece.insert_piece(line, column)
        this.insert_image(line, column)
    }
    insert_position(line, column, piece){
        console.log('Functioner insert_position() called in board, line: ' + line + ' column ' + column + ' piece.name  ' + piece.name)
        this.create_matrix_choices()

        let old_positionX = piece.positionX
        let old_positionY = piece.positionY
        
        this.calculate_choices(old_positionY, old_positionX, piece)

        console.log('Tabela CHOICES, de ' + this.table[line][column].name)
        console.table(this.choices)

        if(piece.insert_position(line, column, this) && (old_positionY !== line || old_positionX !== column)){
            //remove images from the past and actual positions
            if( this.remove_image(line, column) ) this.add_death_score(this.table[line][column]) 
            this.remove_image(old_positionY, old_positionX)

            //replace objects
            this.table[line][column] = piece
            this.table[old_positionY][old_positionX] = this.obj_nothing

            //insert image in the actual position
            this.insert_image(line, column)
        }
        this.create_matrix_choices()

    }
    calculate_choices(line, column, piece){
        console.log(line + ' ' + column)
        console.table(piece)
        //calculate choices that will seee if the king can move
        if(piece.name === 'king'){
            this.table[line][column] = this.obj_nothing
            this.calculate_enemy_side_choices(piece)
            this.table[line][column] = piece
        }
        piece.calculate_choices(this)
        console.table(this.choices)
    }
    calculate_enemy_side_choices(king_obj){
        //create a loop and calculate the choices in each piece
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if(this.table[i][j].side === king_obj.other_side){
                    if(this.table[i][j].name !== 'pawn'){
                        this.table[i][j].calculate_choices(this)
                    }
                    if(this.table[i][j].name === 'pawn'){
                        this.table[i][j].calculate_future_attack(this)
                    }
                }
            }
        }
        this.enemy_choices = this.choices
        this.create_matrix_choices()
    }
    add_death_score(piece){
        if(piece.side === 'white'){
            this.white_pieces_dead[this.number_white_pieces_dead] = piece
            this.number_white_pieces_dead += 1
        }
        else if(piece.side === 'black'){
            this.black_pieces_dead[this.number_black_pieces_dead] = piece
            this.number_black_pieces_dead += 1
        }
    }
    print_board(){
        console.table(this.table)
    }
    print_choices(line, column){
        if(this.table[line][column].name !== 'nothing'){
            this.table[line][column].calculate_choices(this)
            this.print_choices()
        }
    }
    print_choices_html(line, column){
        this.create_matrix_choices()
        this.fulfil_css()

        let items = document.getElementsByClassName('row')
        if(this.table[line][column].name !== 'nothing'){
            this.calculate_choices(line, column, this.table[line][column])
            for (let i = 0; i <= 7; i++) {
                for (let j = 0; j <= 7; j++) {
                    if(this.choices[i][j] === 1){
                        items[i].children[j].style.backgroundColor = 'black';
                    }
                }
            }
        }
    }
    fulfil_css(){
        let m = 0
        let gameTable = document.getElementsByClassName('game-table')
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                m += 1
                if(j%2 === 0 && i%2 === 0){
                    gameTable[0].children[i].children[j].style.backgroundColor = 'darkgrey'
                }
                else if(j%2 === 1 && i%2 === 1){
                    gameTable[0].children[i].children[j].style.backgroundColor = 'darkgrey'
                }
                else{
                    gameTable[0].children[i].children[j].style.backgroundColor = 'white'  
                }

            }
        }
    }
    insert_image(line, column){
        let items = document.getElementsByClassName('row')

        if(this.table[line][column].name !== 'nothing'){
            let DOM_img = document.createElement('img')
            DOM_img.src = './images/' + this.table[line][column].side + '_' + this.table[line][column].name + '.png'
            items[line].children[column].appendChild(DOM_img)
        }
        else console.log('Cant insert image in this pieces, theres no object there')
    }
    remove_image(line, column){
        let items = document.getElementsByClassName('row')
        let img = items[line].children[column].getElementsByTagName('img')

        if(typeof(img[0]) === 'object'){
            items[line].children[column].removeChild(img[0])
            this.fulfil_css()
            return true
        }
        else{
            console.log('Cant remove image')
            return false
        }
    }
    print_choices(){
        console.log('Tabela de escolhas do ' + this.name)
        console.table(this.choices)
    }
}
class Turn{
    constructor(){
        this.side = 'white'
    }
    changeTurn(){
        console.log('Changed the turn, now is ' + this.side + ' turn')
        if(this.side === 'white')  this.side = 'black'
        else if(this.side === 'black') this.side = 'white'
    }
}

//TODO: 
//     if the king can't move, check mate!
//     if clicked again in start game, the game should reset
//     if clicked again in the piece, will not show the possibilities
//     show the dead pieces on the side

//     create more classes
//     refactor the if conditions to be more pure
//     refactor the class pawn

const board = new Board()
const turn = new Turn()

let line, column
let table = document.getElementsByClassName('game-table')
var score = document.getElementsByClassName('game-score');

table[0].addEventListener('click', boardClick)

function boardClick(elem){
    elem.preventDefault()
    line = parseInt(elem.target.parentNode.id)
    column = parseInt(elem.target.id)

    check_turn_side()
    check_position()
    print_pieces_dead_html()

}

function check_turn_side(){
    if(turn.side === board.table[line][column].side){
        board.print_choices_html(line, column)
        if(board.table[line][column].name !== 'nothing'){
            board.actual_object = board.table[line][column]
        }
    }
}
function check_position(){
    if(board.choices[line][column] === 1){
        board.insert_position(line, column, board.actual_object)
        turn.changeTurn()
    }
}
function print_pieces_dead_html(){
    var paragraph = document.getElementById('p1')
    paragraph.textContent = board.white_pieces_dead.length
    var paragraph = document.getElementById('p2')
    paragraph.textContent = board.black_pieces_dead.length
}

let start = document.getElementById('start-game')
start.addEventListener('click', buttonClick)
function buttonClick(elem){
    console.log('Button clicked')
    start_game()

}

function start_game(){
    board.fulfil_css()

    const king_white = new King('king', 'white')
    const king_black = new King('king', 'black')
    const bishop_white1 = new Bishop('bishop', 'white')
    const bishop_white2 = new Bishop('bishop', 'white')
    const bishop_black1 = new Bishop('bishop', 'black')
    const bishop_black2 = new Bishop('bishop', 'black')
    const knight_white1 = new Knight('knight', 'white')
    const knight_white2 = new Knight('knight', 'white')
    const knight_black1 = new Knight('knight', 'black')
    const knight_black2 = new Knight('knight', 'black')
    const rook_white1 = new Rook('rook', 'white')
    const rook_white2 = new Rook('rook', 'white')
    const rook_black1 = new Rook('rook', 'black')
    const rook_black2 = new Rook('rook', 'black')
    const pawn_white1 = new Pawn('pawn', 'white')
    const pawn_white2 = new Pawn('pawn', 'white')
    const pawn_white3 = new Pawn('pawn', 'white')
    const pawn_white4 = new Pawn('pawn', 'white')
    const pawn_white5 = new Pawn('pawn', 'white')
    const pawn_white6 = new Pawn('pawn', 'white')
    const pawn_white7 = new Pawn('pawn', 'white')    
    const pawn_white8 = new Pawn('pawn', 'white')
    const pawn_black1 = new Pawn('pawn', 'black')
    const pawn_black2 = new Pawn('pawn', 'black')
    const pawn_black3 = new Pawn('pawn', 'black')
    const pawn_black4 = new Pawn('pawn', 'black')
    const pawn_black5 = new Pawn('pawn', 'black')
    const pawn_black6 = new Pawn('pawn', 'black')
    const pawn_black7 = new Pawn('pawn', 'black')    
    const pawn_black8 = new Pawn('pawn', 'black')

    const queen_white = new Queen('queen', 'white')
    const queen_black = new Queen('queen', 'black')

    board.insert_piece(7, 4, king_white)
    board.insert_piece(0, 4, king_black)
    board.insert_piece(7, 2, bishop_white1)
    board.insert_piece(7, 5, bishop_white2)
    board.insert_piece(0, 2, bishop_black1)
    board.insert_piece(0, 5, bishop_black2)
    board.insert_piece(7, 1, knight_white1)
    board.insert_piece(7, 6, knight_white2)
    board.insert_piece(0, 1, knight_black1)
    board.insert_piece(0, 6, knight_black2)
    board.insert_piece(7, 0, rook_white1)
    board.insert_piece(7, 7, rook_white2)
    board.insert_piece(0, 0, rook_black1)
    board.insert_piece(0, 7, rook_black2)
    board.insert_piece(1, 0, pawn_black1)
    board.insert_piece(1, 1, pawn_black2)
    board.insert_piece(1, 2, pawn_black3)
    board.insert_piece(1, 3, pawn_black4)
    board.insert_piece(1, 4, pawn_black5)
    board.insert_piece(1, 5, pawn_black6)
    board.insert_piece(1, 6, pawn_black7)
    board.insert_piece(1, 7, pawn_black8)
    board.insert_piece(6, 0, pawn_white1)
    board.insert_piece(6, 1, pawn_white2)
    board.insert_piece(6, 2, pawn_white3)
    board.insert_piece(6, 3, pawn_white4)
    board.insert_piece(6, 4, pawn_white5)
    board.insert_piece(6, 5, pawn_white6)
    board.insert_piece(6, 6, pawn_white7)
    board.insert_piece(6, 7, pawn_white8)
    board.insert_piece(7, 3, queen_white)
    board.insert_piece(0, 3, queen_black)
    
}