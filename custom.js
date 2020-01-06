
class Board{
    constructor(){
        this.turn = new Turn()
        this.dom = new DOM()
        this.obj_nothing = new Nothing()

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
        this.white_king_in_check = false
        this.black_king_in_check = false

        
        this.king_white = new King('king', 'white')
        this.king_black = new King('king', 'black')
        this.bishop_white1 = new Bishop('bishop', 'white')
        this.bishop_white2 = new Bishop('bishop', 'white')
        this.bishop_black1 = new Bishop('bishop', 'black')
        this.bishop_black2 = new Bishop('bishop', 'black')
        this.knight_white1 = new Knight('knight', 'white')
        this.knight_white2 = new Knight('knight', 'white')
        this.knight_black1 = new Knight('knight', 'black')
        this.knight_black2 = new Knight('knight', 'black')
        this.rook_white1 = new Rook('rook', 'white')
        this.rook_white2 = new Rook('rook', 'white')
        this.rook_black1 = new Rook('rook', 'black')
        this.rook_black2 = new Rook('rook', 'black')
        this.pawn_white1 = new Pawn('pawn', 'white')
        this.pawn_white2 = new Pawn('pawn', 'white')
        this.pawn_white3 = new Pawn('pawn', 'white')
        this.pawn_white4 = new Pawn('pawn', 'white')
        this.pawn_white5 = new Pawn('pawn', 'white')
        this.pawn_white6 = new Pawn('pawn', 'white')
        this.pawn_white7 = new Pawn('pawn', 'white')    
        this.pawn_white8 = new Pawn('pawn', 'white')
        this.pawn_black1 = new Pawn('pawn', 'black')
        this.pawn_black2 = new Pawn('pawn', 'black')
        this.pawn_black3 = new Pawn('pawn', 'black')
        this.pawn_black4 = new Pawn('pawn', 'black')
        this.pawn_black5 = new Pawn('pawn', 'black')
        this.pawn_black6 = new Pawn('pawn', 'black')
        this.pawn_black7 = new Pawn('pawn', 'black')    
        this.pawn_black8 = new Pawn('pawn', 'black')
    
        this.queen_white = new Queen('queen', 'white')
        this.queen_black = new Queen('queen', 'black')
    
        this.insert_piece(7, 4, this.king_white)
        this.insert_piece(0, 4, this.king_black)
        this.insert_piece(7, 2, this.bishop_white1)
        this.insert_piece(7, 5, this.bishop_white2)
        this.insert_piece(0, 2, this.bishop_black1)
        this.insert_piece(0, 5, this.bishop_black2)
        this.insert_piece(7, 1, this.knight_white1)
        this.insert_piece(7, 6, this.knight_white2)
        this.insert_piece(0, 1, this.knight_black1)
        this.insert_piece(0, 6, this.knight_black2)
        this.insert_piece(7, 0, this.rook_white1)
        this.insert_piece(7, 7, this.rook_white2)
        this.insert_piece(0, 0, this.rook_black1)
        this.insert_piece(0, 7, this.rook_black2)
        this.insert_piece(1, 0, this.pawn_black1)
        this.insert_piece(1, 1, this.pawn_black2)
        this.insert_piece(1, 2, this.pawn_black3)
        this.insert_piece(1, 3, this.pawn_black4)
        this.insert_piece(1, 4, this.pawn_black5)
        this.insert_piece(1, 5, this.pawn_black6)
        this.insert_piece(1, 6, this.pawn_black7)
        this.insert_piece(1, 7, this.pawn_black8)
        this.insert_piece(6, 0, this.pawn_white1)
        this.insert_piece(6, 1, this.pawn_white2)
        this.insert_piece(6, 2, this.pawn_white3)
        this.insert_piece(6, 3, this.pawn_white4)
        this.insert_piece(6, 4, this.pawn_white5)
        this.insert_piece(6, 5, this.pawn_white6)
        this.insert_piece(6, 6, this.pawn_white7)
        this.insert_piece(6, 7, this.pawn_white8)
        this.insert_piece(7, 3, this.queen_white)
        this.insert_piece(0, 3, this.queen_black)
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
        this.dom.insert_image(line, column, this)        
    }

    insert_position(line, column, piece){
        console.log('Functioner insert_position() called in board, line: ' + line + ' column ' + column + ' piece.name  ' + piece.name)

        this.old_positionX = piece.positionX
        this.old_positionY = piece.positionY
        this.actual_object = piece

        if(piece.insert_position(line, column, this)){
            //remove images from the actual position
            if( this.dom.remove_image(line, column) ){
                this.old_object = this.table[line][column]
                this.add_death_score(this.table[line][column])
            }
            //remove images from the past
            this.dom.remove_image(this.old_positionY, this.old_positionX)

            //replace objects
            this.table[this.old_positionY][this.old_positionX] = this.obj_nothing
            this.table[line][column] = piece

            //insert image in the actual position
            this.dom.insert_image(line, column, this)
        }

        this.create_matrix_choices()
    }
    calculate_choices(line, column, piece){
        console.log('Function calculate_choices called')
        //calculate choices that will see if the king can move
        if(piece.name === 'king'){
            this.table[line][column] = this.obj_nothing
            this.calculate_enemy_side_choices(piece)
            this.table[line][column] = piece
        }
        piece.calculate_choices(this)

        //if king is in check, will enter in each elem from the matrix choices
        //if choices[i][j] === 1, check if this movement will help release king
        //if can't release king from check, then choices[i][j] = 0

         if(this.white_king_in_check === true && this.turn.side === 'white'){
            this.calculate_possibility_release_king_from_check(piece)     
        }
        else if(this.black_king_in_check === true && this.turn.side === 'black'){
            this.calculate_possibility_release_king_from_check(piece)     
        }
    }
    undo(){
        this.choices[this.old_positionY][this.old_positionX] = 1
        this.insert_position(this.old_positionY, this.old_positionX, this.actual_object)
        this.choices[this.old_positionY][this.old_positionX] = 0

        if(typeof(this.old_object) === 'object'){
            this.choices[this.old_object.positionY][this.old_object.positionX] = 1
            this.insert_position(this.old_object.positionY, this.old_object.positionX, this.old_object)
            this.choices[this.old_object.positionY][this.old_object.positionX] = 1
        }

    }
    calculate_possibility_release_king_from_check(piece){
        console.log('Function calculate_possibility_release_king_from_check() was called')
        let tmp = this.choices
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if(tmp[i][j] === 1){
                    this.choices = tmp
                    this.insert_position(i, j, piece)
                    if(this.calculate_check_probability()){
                        tmp[i][j] = 0
                    }
                    this.undo()
                }
            }
        }
        this.choices = tmp
    }
    //return true if the king is in check
    calculate_check_probability(){
        console.log('Function calculate_check_probability() called')
        if(this.turn.side === 'black'){
            this.calculate_enemy_side_choices(this.king_black)
        }
        if(this.turn.side === 'white'){
            this.calculate_enemy_side_choices(this.king_white)
        }

        if(this.enemy_choices[this.king_white.positionY][this.king_white.positionX] === 1 && this.turn.side === 'white'){
            console.log('okidoki')
            this.create_matrix_choices()
            this.dom.change_background('red')
            this.white_king_in_check = true
            return true
        }
        else if(this.enemy_choices[this.king_black.positionY][this.king_black.positionX] === 1 && this.turn.side === 'black'){
            console.log('okidoki')
            this.create_matrix_choices()
            this.dom.change_background('darkred')
            this.black_king_in_check = true
            return true
        }
        else{
            this.dom.change_background('white')
            this.create_matrix_choices()
            this.black_king_in_check = false
            this.white_king_in_check = false

            return false
        }
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

class Turn{
    constructor(){
        this.side = 'white'
        this.other_side = 'black'
    }
    changeTurn(){
        let tmp = this.side
        this.side = this.other_side
        this.other_side = tmp
        console.log('Changed the turn, now is ' + this.side + ' turn')
    }
}

//TODO: 
//     save all the movements made in board
//     undo have to return multiple times and not just 1
//     if the piece that is in front of the king and protecting it, it will not move unless its to save
//     protecting the king
//     if the king can't move, check mate!

//     if clicke in star game, the game should start
//     if clicked again in start game, the game should reset
//     if clicked again in the piece, will not show the possibilities
//     show the dead pieces on the side

//     separate the code in multiple files
//     create more classes
//     refactor the if conditions to be more pure
//     refactor the class pawn

let line, column
let table = document.getElementsByClassName('game-table')
var score = document.getElementsByClassName('game-score');

table[0].addEventListener('click', boardClick)

function boardClick(elem){
    elem.preventDefault()
    line = parseInt(elem.target.parentNode.id)
    column = parseInt(elem.target.id)

    check_turn_side(line, column)
    check_position(line, column)
    print_pieces_dead_html()

}

const board = new Board()

function check_turn_side(line, column){
    if(board.turn.side === board.table[line][column].side){
        board.dom.print_choices(line, column, board)
        if(board.table[line][column].name !== 'nothing'){
            board.actual_object = board.table[line][column]
        }
    }
}
function check_position(line, column){
    if(board.choices[line][column] === 1){
        board.insert_position(line, column, board.actual_object)
        board.turn.changeTurn()
    }
}
function print_pieces_dead_html(){
    let paragraph = document.getElementById('p1')
    paragraph.textContent = board.white_pieces_dead.length
    paragraph = document.getElementById('p2')
    paragraph.textContent = board.black_pieces_dead.length
}


let start = document.getElementById('start-game')
start.addEventListener('click', buttonClickStartGame)
function buttonClickStartGame(elem){
    start_game()
}
let undo = document.getElementById('undo')
undo.addEventListener('click', buttonClickUndo)
function buttonClickUndo(elem){
    console.log('Button undo clicked')
    board.undo()
    board.turn.changeTurn()
}

function start_game(){
    board.dom.fulfil_css()
}