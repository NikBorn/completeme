import Node from '../scripts/Node.js'

class Trie {
  constructor() {
    this.root = new Node('root');
    this.wordCount = 0;
  }

  insert(string) {
    let stringArray = [...string.toLowerCase()]
    let currentNode = this.root

    for (var i = 0; i < stringArray.length; i++) {
      let currentLetter = stringArray[i]

      if (!currentNode.children[currentLetter]) {
        let newNode = new Node(currentLetter)

        currentNode.children[currentLetter] = newNode;
      }

      currentNode = currentNode.children[currentLetter]

      if (i === stringArray.length - 1 && !currentNode.isCompleteWord) {
        currentNode.isCompleteWord = true;
        this.wordCount++
      }
    }
  }

  suggest(string) {

    let input = [...string.toLowerCase()]
    let currentNode = this.root

    input.forEach((letter) => {

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      }
    })

    return this.suggestHelp(currentNode, string)

  }

  suggestHelp(currentNode, word, array = [] ) {

    if (currentNode.isCompleteWord) {
      array.push({ name: word, selected: currentNode.selected})

    }



    let currentKeys = Object.keys(currentNode.children);

    currentKeys.forEach((letter) => {

      this.suggestHelp(currentNode.children[letter], word + letter, array)

    })


    return array.sort(function (a, b) {
      return b.selected - a.selected
    }).reduce((array, obj) => {
      array.push(obj.name)

      return array
    }, [])
  }


  populate(array) {
    for (var i = 0; i < array.length; i++) {
      this.insert(array[i])
    }

  }

  select(string) {

    let input = [...string.toLowerCase()]
    let currentNode = this.root

    input.forEach((letter) => {

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      }
    })

    currentNode.selected++
  }

  count() {
    return this.wordCount
  }
}



export default Trie
