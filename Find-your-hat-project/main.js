const prompt = require("prompt-sync")({ sigint: true });
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  #field;

  constructor(arr) {
    this.#field = arr;
  }

  // Getters
  get field() {
    return this.#field;
  }

  // Methods
  print() {
    for (let row = 0; row < this.#field.length; row++) {
      console.log(this.#field[row].join(""));
    }
  }

  static randomPos(row, column) {
    const randRow = Math.floor(Math.random() * row);
    const randCol = Math.floor(Math.random() * column);
    return [randRow, randCol];
  }

  static generateField(width, height, percentage = 0.5) {
    // Randomize tiles and obstacles for the field
    let arr = [];
    let tiles = ["░", "O"];

    // row-height, col-width
    for (let h = 0; h < height; h++) {
      let row = [];
      for (let w = 0; w < width; w++) {
        const rand = Math.floor(Math.random() * tiles.length * percentage);
        row.push(tiles[rand]);
      }
      arr.push(row);
    }
    return arr;
  }

  initPos(row, col, type) {
    const [r, c] = Field.randomPos(row, col);
    this.#field[r][c] = type;
    // x - col, y - row
    return [c, r];
  }

  trackPlayer(row, col, type, player) {
    if (this.checkObstacle(row, col, type)) return true;
    else if (this.checkBoundary(row, col)) console.log("Get another way!");
    else this.updateMap(row, col, player);
  }

  checkObstacle(row, col, type) {
    if (this.#field[row][col] === type) {
      return true;
    }
  }

  checkBoundary(row, col) {
    if (
      row > this.#field.length - 1 ||
      row < 0 ||
      col > this.#field[row].length - 1 ||
      col < 0
    ) {
      console.log("Get another direction!");
      return true;
    }
  }

  updateMap(row, col, type) {
    this.#field[row][col] = type;
  }
}

class Player {
  #posX;
  #posY;

  constructor(posX, posY) {
    this.#posX = posX;
    this.#posY = posY;
  }

  // Getters
  get posX() {
    return this.#posX;
  }
  get posY() {
    return this.#posY;
  }

  // method
  set posX(x) {
    this.#posX = x;
  }

  set posY(y) {
    this.#posY = y;
  }
}

let isGameOver = false;
const [width, height] = [20, 10];
const f = new Field(Field.generateField(width, height, 0.6));
posHat = f.initPos(height, width, hat);
posPlayer = f.initPos(height, width, pathCharacter);
f.print();

const player = new Player(...posPlayer);
console.log("Player position: ", player.posY, player.posX);
while (!isGameOver) {
  const direction = prompt(
    "Which direction you want to go (W-A-D-S)? "
  ).toUpperCase()[0];

  // Player => x = width (col), y = height (row)
  switch (direction) {
    case "W":
      player.posY--;
      if (f.checkBoundary(player.posY, player.posX)) {
        player.posY++;
      } else if (f.checkObstacle(player.posY, player.posX, hole)) {
        isGameOver = true;
      } else {
        f.updateMap(player.posY, player.posX, pathCharacter);
        console.log(`Move Up! (row: ${player.posY}, col ${player.posX})`);
      }
      break;
    case "S":
      player.posY++;
      if (f.checkBoundary(player.posY, player.posX)) {
        player.posY--;
      } else if (f.checkObstacle(player.posY, player.posX, hole)) {
        isGameOver = true;
      } else {
        f.updateMap(player.posY, player.posX, pathCharacter);
        console.log(`Move Down! (row: ${player.posY}, col ${player.posX})`);
      }
      break;
    case "A":
      player.posX--;
      if (f.checkBoundary(player.posY, player.posX)) {
        player.posX++;
      } else if (f.checkObstacle(player.posY, player.posX, hole)) {
        isGameOver = true;
      } else {
        f.updateMap(player.posY, player.posX, pathCharacter);
        console.log(`Move Left! (row: ${player.posY}, col ${player.posX})`);
      }
      break;
    case "D":
      player.posX++;
      if (f.checkBoundary(player.posY, player.posX)) {
        player.posX--;
      } else if (f.checkObstacle(player.posY, player.posX, hole)) {
        isGameOver = true;
      } else {
        f.updateMap(player.posY, player.posX, pathCharacter);
        console.log(`Move Right! (row: ${player.posY}, col ${player.posX})`);
      }
      break;
    default:
      console.log(`>>>'${direction}' => invalid movement! Try again!`);
      break;
  }
  if (player.posX === posHat[0] && player.posY === posHat[1]) {
    console.log(`Congratulation! You found your hat!`);
    isGameOver = true;
  } else if (isGameOver) {
    console.log(`Oh no! You fell down a hole!`);
  } else {
    f.print();
  }
}
