/* TODO:
    1. Make the animation of inserting image different of moving image
 */    
class DOM {
  startGame(){
    const gameScore = document.getElementsByClassName('game-score');
    const undoButton = document.getElementById('undo');
    const startGameButton = document.getElementById('start-game');

    this.animateScores(gameScore)
    this.animateUndoButton(undoButton)
  }
  animateScores(gameScore){
    gameScore[0].style.transition = "3s";
    gameScore[1].style.transition =  "3s";

    gameScore[0].style.transitionDelay = "4s";
    gameScore[1].style.transitionDelay =  "4s";

    gameScore[0].style.opacity = 1;
    gameScore[1].style.opacity = 1;
  }
  animateUndoButton(undoButton){
    undoButton.style.transition =  "3s";

    undoButton.style.transitionDelay =  "4s";

    undoButton.style.opacity = 1;
  }

  fulfilBoardTable(time){
    let m = 0;
    const gameTable = document.getElementsByClassName('game-table');
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        this.animateBoardTable(gameTable, time, i, j)

        m += 1;
        if (j % 2 === 0 && i % 2 === 0) {
          gameTable[0].children[i].children[j].style.backgroundColor = 'darkgrey';
        } else if (j % 2 === 1 && i % 2 === 1) {
          gameTable[0].children[i].children[j].style.backgroundColor = 'darkgrey';
        } else {
          gameTable[0].children[i].children[j].style.backgroundColor = 'white';
        }
      }
    }
  }
  animateBoardTable(gameTable, time, i, j){
      gameTable[0].children[i].children[j].style.transition = "all " + time + "s";
  }
  
  finishGame(side){
    let paragraph = document.getElementById('final');
    paragraph.textContent = 'Game is Finished, ' + side + ' won';
    paragraph.style.backgroundColor = 'yellow';
    paragraph.style.textAlign = "center";
  }
  //impure
  printChoices(line, column, board) {
    console.log('Function printChoices from DOM called');
    board.createMatrixChoices();
    this.fulfilBoardTable(0);

    const items = document.getElementsByClassName('row');
    if (board.table[line][column].name !== 'nothing') {
      board.choices = board.calculateChoices(line, column, board.table[line][column]);
      for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
          if (board.choices[i][j] === 1) {
            items[i].children[j].style.backgroundColor = 'black';
            this.animateChoices(items, i, j)
          }
        }
      }
    }
  }
  animateChoices(items, i, j){
    items[i].children[j].style.transition = "all 0.5s";
  }
  insertImage(line, column, board) {
    console.log(`Inserting image in line ${line} and column ${column}`);
    const items = document.getElementsByClassName('row');

    if (board.table[line][column].name !== 'nothing') {
      const DOM_img = document.createElement('img');
      DOM_img.src = `resources/images/${board.table[line][column].side}_${board.table[line][column].name}.png`;
      items[line].children[column].appendChild(DOM_img);

      this.setImageTransition(DOM_img)
      if(board.gameStarted === false){
        this.delayInsertingImages(DOM_img, line, column)
      }
      this.animateImages(DOM_img, line, column)
    } else console.log('Cant insert image in this pieces, exist obj_nothing there');
  }
  setImageTransition(DOM_img){
    DOM_img.style.transition = 'all 0.3s ease';
  }
  delayInsertingImages(DOM_img, line, column){
    if(line === 0) DOM_img.style.transitionDelay = 1 + column/4 + 's';
    if(line === 1) DOM_img.style.transitionDelay = 3 + column/4 + 's';
    if(line === 6) DOM_img.style.transitionDelay = 4 + column/4 + 's';
    if(line === 7) DOM_img.style.transitionDelay = 5 + column/4 + 's';
  }
  animateImages(DOM_img, line, column){
    //flushes all pending style changes and forces the layout engine to compute the element's current state, 
    DOM_img.getBoundingClientRect()

    DOM_img.style.transform = "translateY(+125px)";
    DOM_img.style.opacity = 1;
  }
  removeImage(line, column) {
    const items = document.getElementsByClassName('row');
    const img = items[line].children[column].getElementsByTagName('img');

    if (typeof img[0] === 'object') {
      items[line].children[column].removeChild(img[0]);
      this.fulfilBoardTable(0);
      return true;
    }
    console.log('Cant remove image, theres no object');
    return false;
  }

  changeBackground(color) {
    const item = document.getElementsByClassName('container');
    item[0].style.backgroundColor = color;
  }
  updateScore(){
    let paragraph = document.getElementById('p1')
    paragraph.textContent = board.number_white_pieces_dead
    paragraph = document.getElementById('p2')
    paragraph.textContent = board.number_black_pieces_dead
  }

}