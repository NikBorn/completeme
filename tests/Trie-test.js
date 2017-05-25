import { expect } from 'chai';
import Trie from '../scripts/Trie.js'
import fs from 'fs'




describe('Trie', function () {
  this.timeout(20000)
  let newTrie;

  beforeEach(() => {
    newTrie = new Trie();
  })

  it('should be a function', () => {
    expect(newTrie).to.be.Function
  })

  it('should be able to insert new words', ()=> {
    newTrie.insert('Addition')
    newTrie.insert('Apple')
    newTrie.insert('Butt')
    newTrie.insert('AppleSauce')
    newTrie.insert('As')

    expect(newTrie.root.children).to.have.property('a' && 'b')
    expect(newTrie.root.children.a.children).to.have.property('p')
    expect(newTrie.root
      .children.a
      .children.p
      .children).to.have.property('p')
    expect(newTrie.root
      .children.a
      .children.p
      .children.p
      .children).to.have.property('l')
    expect(newTrie.root
      .children.a
      .children.p
      .children.p
      .children.l
      .children).to.have.property('e')
  })

  it('should mark the final letter of a word as complete', () => {
    newTrie.insert('Apple')
    newTrie.insert('Banana')
    expect(newTrie.root
      .children.a
      .children.p
      .children.p
      .children.l
      .children.e.isCompleteWord).to.equal(true)

    expect(newTrie.root
      .children.b
      .children.a
      .children.n
      .children.a
      .children.n
      .children.a.isCompleteWord).to.equal(true)
  })

  it('should add a word to wordCount when a word is added', () => {
    newTrie.insert('Addition')
    newTrie.insert('Butt')
    newTrie.insert('AppleSauce')
    newTrie.insert('As')
    newTrie.insert('Apple')

    expect(newTrie.wordCount).to.equal(5)
  })

  it('should not add duplicate words', () => {
    newTrie.insert('Addition')
    newTrie.insert('Butt')
    newTrie.insert('AppleSauce')
    newTrie.insert('As')
    newTrie.insert('Apple')
    newTrie.insert('Apple')
    newTrie.insert('Apple')

    expect(newTrie.wordCount).to.equal(5)
  })

  it('should populate a dictionary of words', () => {

    const text = "/usr/share/dict/words"
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    newTrie.populate(dictionary)

    expect(newTrie.wordCount).to.equal(234371)

  })

  it('should return wordCount when .count is called', () => {
    const text = "/usr/share/dict/words"
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    newTrie.populate(dictionary)

    expect(newTrie.wordCount).to.equal(newTrie.count())
  })

  it('should return a list of suggested words', () => {
    const text = "/usr/share/dict/words"
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    newTrie.populate(dictionary)

    expect(newTrie.suggest('Zooch')).to.deep.equal([ 'Zoochemical', 'Zoochemistry', 'Zoochemy', 'Zoochlorella', 'Zoochore' ])

    expect(newTrie.suggest('Apply')).to.deep.equal([ 'Apply', 'Applyingly', 'Applyment' ])


  })

  it('should mark a word as selected when select() is called', () => {
    newTrie.insert('Apple')
    newTrie.insert('Banana')

    newTrie.select('Apple')

    newTrie.select('Banana')
    newTrie.select('Banana')


    expect(newTrie.root
      .children.a
      .children.p
      .children.p
      .children.l
      .children.e.selected).to.equal(1)

    expect(newTrie.root
      .children.b
      .children.a
      .children.n
      .children.a
      .children.n
      .children.a.selected).to.equal(2)

  })

  it('should filter suggestions based on node.selected', () => {
    newTrie.insert('Apple')
    newTrie.insert('Applesauce')
    newTrie.insert('App')

    expect(newTrie.suggest('App')).to.deep.equal([ 'App', 'Apple', 'Applesauce' ])

    newTrie.select('Apple')
    newTrie.select('Applesauce')
    newTrie.select('Applesauce')

    expect(newTrie.suggest('App')).to.deep.equal([ 'Applesauce', 'Apple' ,'App' ])

  })
})
