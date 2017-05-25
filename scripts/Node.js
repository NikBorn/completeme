class Node {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.isCompleteWord = false;
    this.word;
    this.selected = 0;
  }
}

export default Node
