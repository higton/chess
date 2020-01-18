
class Matrix{
    static isJustZeros(matrix){
      for(let i = 0; i <= 7; i++){
        for(let j = 0; j <= 7; j++){
          if(matrix[i][j] !== 0){
            return false
          }
        }
      }
      return true
    }
    static copyMatrix(matrixOrigin){
      let matrix = [];
      for (let i = 0; i <= 7; i++) {
        matrix.push([0])
        for (let j = 0; j <= 7; j++) {
          matrix[i][j] = 0;
        }
      }
      for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
          matrix[i][j] = matrixOrigin[i][j];
        }
      }
      return matrix 
    }
  
    static mergeMatrices(oldMatrix, newMatrix){
      for (let i = 0; i <= 7; i++) {
          for (let j = 0; j <= 7; j++) {
             if(oldMatrix[i][j] === 1){
                 newMatrix[i][j] = 1
             }
          }
      }
    }
    static createMatrix() {
      const matrix = [];
      for (let i = 0; i < 8; i++) {
        matrix.push(new Array(8).fill(0));
      }
      return matrix
    }
  }