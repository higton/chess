class Pawn{
    constructor(){
        this.name = 'Pawn'
        this.positionY = 0
        this.positionX = 0
    }
    insert_position(line, column, board){
        if(0 >= line - this.positionY){
            console.log('Tentou inserir o pawn numa posição anterior ou na mesma posição já existente')
            return false
        }
        for(let i = this.positionY + 1; i <= line; i++){
            console.log('valor de i ' + i + ' valor de positionY ' + this.positionY )
            if(!board.check_position(i, column)){
                this.positionY += 1
            }
            else{
                console.log("Já existe peça nessa posição ou no caminho")
                return false
            }
        }
        return true
    }
}
class Board{
    create_matrix(){
        let pieces = []
        let result = []
        for(let i = 0; i < 7 ; i++){
            result.push(new Array(7).fill(0))
        }
        this.result = result
        this.pieces = pieces
    }
    insert_piece(line, column, object, board){
        this.pieces.push(object)
    }
    insert_position(line, column, object, board){
        if(object.insert_position(line, column, board) === true){
            this.result[line][column] = 1
        }
    }
    check_position(line, column){
        if(this.result[line][column] === 1){
            console.log('This position is occupied, line '+ line + ' column ' + column)
            return true
        }
        else{
            return false
        }
    }
    print_board(){
        console.dir(this.result)
    }

}

const board1 = new Board()
const pawn1 = new Pawn()
board1.create_matrix()
//insert_position(line, column)
board1.insert_piece(pawn1)