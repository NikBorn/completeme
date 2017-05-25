import { expect } from 'chai';
import Node from '../scripts/Node.js'

describe('Node', () => {

  let newNode;

  beforeEach(() => {
    newNode = new Node("a");
  })

  it('should be a function', () => {
    expect(newNode).to.be.Function
  })

  it('should have a letter', () => {
    expect(newNode.letter).to.equal("a")
  })

  it('should have a property of "children"', () => {
    expect(newNode.children).to.deep.equal({})
  })

  it('should start with isCompleteWord set to false', () => {
    expect(newNode.isCompleteWord).to.equal(false)
  })

})
