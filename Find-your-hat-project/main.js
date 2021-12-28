const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
// const name = prompt("Enter your name: ");
class Field {
  #field;
  // #initPlayer;
  // #initHat;

  constructor(arr) {
    this.#field = arr;
    // this.#initPlayer = Field.randomGrid(x, y);
    // this.#initHat = Field.randomGrid(x, y);
  }

  // Getters
  get field() {
    return this.#field;
  }
  // get playerPos() {
  //   return this.#initPlayer;
  // }
  // get hatPos() {
  //   return this.#initHat;
  // }
  // Methods
  print() {
    // console.log(this.#field);
    for (let row = 0; row < this.#field.length; row++) {
      console.log(this.#field[row].join(""));
      // for (let col = 0; col < this.#field[row].length; col++) {
      //   console.log(this.#field[row][col]);
      // }
    }
  }

  static randomGrid(row, column) {
    const randRow = Math.floor(Math.random() * row);
    const randCol = Math.floor(Math.random() * column);
    return [randRow, randCol];
  }

  static generateField(width, height, percentage = 0.5) {
    // Randomize tiles and obstacles for the field
    let arr = [];
    let tiles = ["░", "O"];
    for (let h = 0; h < height; h++) {
      let row = [];
      for (let w = 0; w < width; w++) {
        const rand = Math.floor(Math.random() * tiles.length * percentage);
        row.push(tiles[rand]);
      }
      arr.push(row);
    }

    // // Generate start point for player and hat
    // const randPlayer = this.setPlayer(height, width);
    // const randHat = this.setHat(height, width);
    const randPlayer = Field.randomGrid(height, width);
    const randHat = Field.randomGrid(height, width);
    arr[randHat[0]][randHat[1]] = hat;
    arr[randPlayer[0]][randPlayer[1]] = pathCharacter;

    return arr;
  }

  // #setPlayer(x, y) {}
  // #setHat(x, y) {}
}

class Player {
  #posX;
  #posY;
  constructor(posX, posY) {
    this.#posX = posX;
    this.#posY = posY;
  }
}
const f = new Field(Field.generateField(20, 10, 0.6));

f.print();
