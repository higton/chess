class DOM {
  fulfilCss(time) {
    let m = 0;
    const gameTable = document.getElementsByClassName('game-table');
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        m += 1;
        if (j % 2 === 0 && i % 2 === 0) {
          gameTable[0].children[i].children[j].style.transition = "all " + time + "s";
          gameTable[0].children[i].children[j].style.backgroundColor = 'darkgrey';
        } else if (j % 2 === 1 && i % 2 === 1) {
          gameTable[0].children[i].children[j].style.transition = "all " + time + "s";
          gameTable[0].children[i].children[j].style.backgroundColor = 'darkgrey';
        } else {
          gameTable[0].children[i].children[j].style.backgroundColor = 'white';
        }
      }
    }
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
    this.fulfilCss(0);

    const items = document.getElementsByClassName('row');
    if (board.table[line][column].name !== 'nothing') {
      board.choices = board.calculateChoices(line, column, board.table[line][column]);
      for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
          if (board.choices[i][j] === 1) {
            items[i].children[j].style.backgroundColor = 'black';
            items[i].children[j].style.transition = "all 0.5s";
          }
        }
      }
    }
  }

  insertImage(line, column, board) {
    console.log(`Inserting image in line ${line} and column ${column}`);
    const items = document.getElementsByClassName('row');

    if (board.table[line][column].name !== 'nothing') {
      const DOM_img = document.createElement('img');
      DOM_img.src = `resources/images/${board.table[line][column].side}_${board.table[line][column].name}.png`;
      items[line].children[column].appendChild(DOM_img);
    } else console.log('Cant insert image in this pieces, exist obj_nothing there');
  }
  
  removeImage(line, column) {
    const items = document.getElementsByClassName('row');
    const img = items[line].children[column].getElementsByTagName('img');

    if (typeof img[0] === 'object') {
      items[line].children[column].removeChild(img[0]);
      this.fulfilCss(0);
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