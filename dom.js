class DOM {
  fulfil_css() {
    let m = 0;
    const gameTable = document.getElementsByClassName('game-table');
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
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

  print_choices(line, column, board) {
    console.log('Function print_choices from DOM called');
    board.create_matrix_choices();
    this.fulfil_css();
    board.isKingInCheck();

    const items = document.getElementsByClassName('row');
    if (board.table[line][column].name !== 'nothing') {
      board.calculate_choices(line, column, board.table[line][column]);
      for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
          if (board.choices[i][j] === 1) {
            items[i].children[j].style.backgroundColor = 'black';
          }
        }
      }
    }
  }

  insert_image(line, column, board) {
    console.log(`Inserting image in line ${line} and column ${column}`);
    const items = document.getElementsByClassName('row');

    if (board.table[line][column].name !== 'nothing') {
      const DOM_img = document.createElement('img');
      DOM_img.src = `./images/${board.table[line][column].side}_${board.table[line][column].name}.png`;
      items[line].children[column].appendChild(DOM_img);
    } else console.log('Cant insert image in this pieces, exist obj_nothing there');
  }

  remove_image(line, column) {
    const items = document.getElementsByClassName('row');
    const img = items[line].children[column].getElementsByTagName('img');

    if (typeof img[0] === 'object') {
      items[line].children[column].removeChild(img[0]);
      this.fulfil_css();
      return true;
    }
    console.log('Cant remove image, theres no object');
    return false;
  }

  change_background(color) {
    const item = document.getElementsByClassName('container');
    item[0].style.backgroundColor = color;
  }
}
