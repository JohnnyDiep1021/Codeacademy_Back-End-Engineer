"strict use";
class Message {
  #sub;
  #arti;
  #noun;
  #verb;
  #adj;

  constructor() {
    this.#sub = ["Your", "You"];
    this.#verb = ["inspire", "build"];
    this.#adj = ["inspirational", "counted"];
    this.#noun = ["effort", "world"];
    this.#arti = ["the"];
  }

  createMessage() {
    const randSub = this.rand(this.#sub.length);
    const randNoun = this.rand(this.#noun.length);
    const randAdj = this.rand(this.#adj.length);
    const randVerb = this.rand(this.#verb.length);
    const randArti = this.rand(this.#arti.length);

    if (randSub === 0) {
      return `${this.#sub[randSub]} ${this.#noun[randNoun]} is ${
        this.#adj[randAdj]
      }!`;
    } else {
      return `${this.#sub[randSub]} ${this.#verb[randVerb]} ${
        this.#arti[randArti]
      } ${this.#noun[randNoun]}`;
    }
  }

  rand(length) {
    const rand = Math.floor(Math.random() * length);
    return rand;
  }
}
const a = new Message();
console.log(a.createMessage());
