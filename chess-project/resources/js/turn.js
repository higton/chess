class Turn {
  constructor() {
    this.side = 'white';
    this.other_side = 'black';
  }

  changeTurn() {
    const tmp = this.side;
    this.side = this.other_side;
    this.other_side = tmp;
    console.log(`Changed the turn, now is ${this.side} turn`);
  }
}
