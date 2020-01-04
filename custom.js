
class Board{
    constructor(){
        this.turn = new Turn()
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
        this.insert_image(line, column)        
    }
    insert_position(line, column, piece){
        console.log('Functioner insert_position() called in board, line: ' + line + ' column ' + column + ' piece.name  ' + piece.name)

        this.old_positionX = piece.positionX
        this.old_positionY = piece.positionY

        this.calculate_choices(this.old_positionY, this.old_positionX, piece)
        if(piece.insert_position(line, column, this)){
            console.log('passou por aqui')

            //remove images from the actual position
            if( this.remove_image(line, column) ){
                this.old_object = this.table[line][column]
                this.add_death_score(this.table[line][column])
            }
            //remove images from the past
            this.remove_image(this.old_positionY, this.old_positionX)

            //replace objects
            this.table[this.old_positionY][this.old_positionX] = this.obj_nothing
            this.table[line][column] = piece

            //insert image in the actual position
            this.insert_image(line, column)
        }

        this.create_matrix_choices()
        
        // for each piece moved, will check if the king
        // is in check
        this.calculate_check_probability(line, column, piece)
    }
    calculate_choices(line, column, piece){
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
/*         if( (this.white_king_in_check === false && piece.side === 'white') 
        || (this.black_king_in_check === false && piece.side === 'black') ){
            this.calculate_possibility_release_king_from_check(piece)     
        } */
    }
    undo(){
        console.table(this.old_object)
        this.choices[this.old_positionY][this.old_positionX] = 1

        this.insert_position(this.old_positionY, this.old_positionX, this.actual_object)

        console.log(typeof(this.old_object))
        if(typeof(this.old_object) === 'object'){
            this.choices[this.old_object.positionY][this.old_object.positionX] = 1
            this.insert_position(this.old_object.positionY, this.old_object.positionX, this.old_object)
        }
        this.turn.changeTurn()
    }
    calculate_possibility_release_king_from_check(piece){
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if(this.table[i][j].side === this.turn.side){
                    if(this.choices[i][j] === 1){
                        this.insert_position(i, j, piece)
                        this.undo
                    }
                }
        }
    }
    }
    calculate_check_probability(line, column, piece){
        this.calculate_choices(line, column, piece)

        if(this.choices[this.king_white.positionY][this.king_white.positionX] === 1){
            console.log('okidoki')
            this.create_matrix_choices()
            this.DOM_change_background('red')
            this.white_king_in_check = true
        }
        else if(this.choices[this.king_black.positionY][this.king_black.positionX] === 1){
            this.create_matrix_choices()
            this.DOM_change_background('darkred')
            this.black_king_in_check = true
        }
        else{
            this.DOM_change_background('white')
            this.create_matrix_choices()
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
        console.log('Inserting image in line ' + line + ' and column ' + column)
        let items = document.getElementsByClassName('row')

        if(this.table[line][column].name !== 'nothing'){
            let DOM_img = document.createElement('img')
            DOM_img.src = './images/' + this.table[line][column].side + '_' + this.table[line][column].name + '.png'
            items[line].children[column].appendChild(DOM_img)
        }
        else console.log('Cant insert image in this pieces, exist obj_nothing there')
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
            console.log('Cant remove image, theres no object')
            return false
        }
    }
    DOM_change_background(color){
        let item = document.getElementsByClassName('container')
        item[0].style.backgroundColor = color;
    }
    print_choices(){
        console.log('Tabela de escolhas do ' + this.name)
        console.table(this.choices)
    }
}
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
//     apply undo
//     if king is in check, can't move others pieces(unless is to help the king)
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
        board.print_choices_html(line, column)
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
start.addEventListener('click', buttonClick)
function buttonClick(elem){
    console.log('Button clicked')
    start_game()

}

function start_game(){
    board.fulfil_css()
}