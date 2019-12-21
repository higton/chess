class Pawn{
    constructor(name){
        this.name = name
        this.positionY = 0
        this.positionX = 0
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
        let side1 = board.table[line][column].substring(0, 4)
        let side2 = board.table[this.positionY][this.positionX].substring(0, 4)
        console.log('side1 ' + side1 + ' side2 ' + side2 + ' positionX ' + this.positionX + ' positionY ' + this.positionY)
        if( (side1 === 'DOWN' && side2 === 'TOP_') || (side1 === 'TOP_' && side2 === 'DOWN')){
            board.table[line][column] = board.table[this.positionY][this.positionX]
            console.log('Pawn attacked in line ' + line + ' column ' + column)
            return true
        }
        else{
            return false
        }
    }
    check_exceptions(line, column, board){
        console.log('Pawn check_exceptions called')
        //see wich side the piece it's from
        let side = board.table[this.positionY][this.positionX].substring(0, 4)
        console.log('side ' + side + '  okoko' + ' positionX ' + this.positionX + ' positionY ' + this.positionY)

        if(2 < line - this.positionY || line > 7){
            console.log('Pawn tentou percorrer fora do limite de linhas')
            return true
        }
        if(column != this.positionX){
            console.log('Pawn tentou mudar de coluna sem atacar')
            return true
        }

        if(this.positionY !== 1 && 1 < line - this.positionY && side === 'TOP_'){
            console.log('Tentou colocar o pawn em uma posição que ele não consegue alcançar')
            return true
        }

        if(this.positionY !== 6 && 1 < line - this.positionY && side === 'DOWN'){
            console.log('Tentou colocar o pawn em uma posição que ele não consegue alcançar')
            return true
        }

        if(0 > line - this.positionY && side === 'TOP_'){
            console.log('Tentou mover para trás o pawn')
            return true
        }

        if(0 < line - this.positionY && side === 'DOWN'){
            console.log('Tentou mover para trás o pawn')
            return true
        }
        else return false
    }
    check_attack_possibility(line, column, board){
        console.log('Pawn check_attack_possibility called')
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
        console.log('Pawn insert_position called')

        if(this.check_attack_possibility(line, column, board)) return true
        if(this.check_exceptions(line, column, board)) return false
        
        for(let i = this.positionY + 1; i <= line; i++){
            console.log('Checando posição para verificar se tem alguma peça, valor de i ' + i + ' valor de positionY ' + this.positionY )
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
    constructor(){
        this.deaths_quantity = 0
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
const enemy_pawn1 = new Pawn('DOWN_Pawn')
board1.create_matrix()
//insert_position(line, column)
board1.insert_piece(1, 1, pawn1)
board1.insert_piece(6, 2, enemy_pawn1)
board1.insert_position(3, 1, pawn1, board1)
console.log('   ')
board1.insert_position(2, 1, pawn1, board1)
console.log('   ')
board1.insert_position(6, 2, enemy_pawn1, board1)
console.log('   ')
board1.insert_position(4, 2, enemy_pawn1, board1)
console.log('   ')
board1.insert_position(4, 2, pawn1, board1)
board1.print_board()