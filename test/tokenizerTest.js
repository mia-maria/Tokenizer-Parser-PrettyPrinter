/**
 * Tests for the tokenizer module.
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import chai from 'chai'
import { Tokenizer } from '../src/tokenizer/tokenizer.js'
import { Grammar } from '../src/tokenizer/grammar.js'
import { Token } from '../src/tokenizer/token.js'

const expect = chai.expect

// ------------------------------------------------------------------------------
//  Testcase 1
// ------------------------------------------------------------------------------

const wordToken = new Token('WORD', /^[\w|åäöÅÄÖ]+/g)
const dotToken = new Token('DOT', /^\./g)
const tokens = [wordToken, dotToken]
const wordAndDotGrammar = new Grammar('wordAndDotGrammar', tokens)
const textTokenizer1 = new Tokenizer(wordAndDotGrammar, 'a')

describe('getFirst', () => {
  describe('return value', () => {
    it('getFirst() should return \'type: WORD value: a\'', () => {
      expect(textTokenizer1.getFirst()).to.eql({ type: 'WORD', value: 'a' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 2
// ------------------------------------------------------------------------------
const textTokenizer2 = new Tokenizer(wordAndDotGrammar, 'a aa')

describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: WORD value: aa\'', () => {
      expect(textTokenizer2.getNext()).to.eql({ type: 'WORD', value: 'aa' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 3
// ------------------------------------------------------------------------------
const textTokenizer3 = new Tokenizer(wordAndDotGrammar, 'a.b')

describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: DOT value: .\'', () => {
      expect(textTokenizer3.getNext()).to.eql({ type: 'DOT', value: '.' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 4
// ------------------------------------------------------------------------------
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: WORD value: b\'', () => {
      expect(textTokenizer3.getNext()).to.eql({ type: 'WORD', value: 'b' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 5
// ------------------------------------------------------------------------------

const textTokenizer4 = new Tokenizer(wordAndDotGrammar, 'aa.b')
textTokenizer4.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: WORD value: b\'', () => {
      expect(textTokenizer4.getNext()).to.eql({ type: 'WORD', value: 'b' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 6
// ------------------------------------------------------------------------------

const textTokenizer5 = new Tokenizer(wordAndDotGrammar, 'a .b')
textTokenizer5.getNext()
textTokenizer5.getNext()
describe('getPrevious', () => {
  describe('return value', () => {
    it('getPrevious() should return \'type: DOT value: .\'', () => {
      expect(textTokenizer5.getPrevious()).to.eql({ type: 'DOT', value: '.' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 7
// ------------------------------------------------------------------------------

const textTokenizer6 = new Tokenizer(wordAndDotGrammar, '')
describe('getFirst', () => {
  describe('return value', () => {
    it('getFirst() should return \'type: END value: end\'', () => {
      expect(textTokenizer6.getFirst()).to.eql({ type: 'END', value: 'end' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 8
// ------------------------------------------------------------------------------

const textTokenizer7 = new Tokenizer(wordAndDotGrammar, ' ')
describe('getFirst', () => {
  describe('return value', () => {
    it('getFirst() should return \'type: END value: end\'', () => {
      expect(textTokenizer7.getFirst()).to.eql({ type: 'END', value: 'end' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 9
// ------------------------------------------------------------------------------

const textTokenizer8 = new Tokenizer(wordAndDotGrammar, 'a')
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: END value: end\'', () => {
      expect(textTokenizer8.getNext()).to.eql({ type: 'END', value: 'end' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 10
// ------------------------------------------------------------------------------

const textTokenizer9 = new Tokenizer(wordAndDotGrammar, 'a')
describe('getPrevious', () => {
  describe('return value', () => {
    it('getPrevious() should throw an error', () => {
      expect(function () {
        textTokenizer9.getPrevious()
      }).to.throw('There is no previous token.')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 11
// ------------------------------------------------------------------------------
const textTokenizer10 = new Tokenizer(wordAndDotGrammar, '!')
describe('getFirst', () => {
  describe('return value', () => {
    it('getFirst() should throw an error', () => {
      expect(function () {
        textTokenizer10.getFirst()
      }).to.throw('FAILED TOKENMATCH: !')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 12
// ------------------------------------------------------------------------------

const number = new Token('NUMBER', /^[0-9]+(\.([0-9])+)?/g)
const addition = new Token('ADDITION', /^[+]/g)
const multiplication = new Token('MULTIPLICATION', /^[*]/g)
const minus = new Token('MINUS', /^[-]/g)
const division = new Token('DIVISION', /^[/]/g)
const leftParentheses = new Token('LEFT-PARENTHESIS', /^[(]/g)
const rightParentheses = new Token('RIGHT-PARENTHESIS', /^[)]/g)
const arithmeticTokens = [number, addition, multiplication, minus, division, leftParentheses, rightParentheses]
const arithmeticGrammar = new Grammar('arithmeticGrammar', arithmeticTokens)
const mathTokenizer = new Tokenizer(arithmeticGrammar, '3')
describe('getFirst', () => {
  describe('return value', () => {
    it('getFirst() should return \'type: NUMBER value: 3\'', () => {
      expect(mathTokenizer.getFirst()).to.eql({ type: 'NUMBER', value: '3' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 13
// ------------------------------------------------------------------------------

const mathTokenizer2 = new Tokenizer(arithmeticGrammar, '3.14')
describe('getFirst', () => {
  describe('return value', () => {
    it('getFirst() should return \'type: NUMBER value: 3.14\'', () => {
      expect(mathTokenizer2.getFirst()).to.eql({ type: 'NUMBER', value: '3.14' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 14
// ------------------------------------------------------------------------------

const mathTokenizer3 = new Tokenizer(arithmeticGrammar, '3 + 54 * 4')
mathTokenizer3.getNext()
mathTokenizer3.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: MULTIPLICATION value: *\'', () => {
      expect(mathTokenizer3.getNext()).to.eql({ type: 'MULTIPLICATION', value: '*' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 15
// ------------------------------------------------------------------------------

const mathTokenizer4 = new Tokenizer(arithmeticGrammar, '3+5 # 4')
mathTokenizer4.getNext()
mathTokenizer4.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should throw an error', () => {
      expect(function () {
        mathTokenizer4.getNext()
      }).to.throw('FAILED TOKENMATCH: #')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 16
// ------------------------------------------------------------------------------

const mathTokenizer5 = new Tokenizer(arithmeticGrammar, '3.0+54.1     + 4.2')
mathTokenizer5.getNext()
mathTokenizer5.getPrevious()
mathTokenizer5.getNext()
mathTokenizer5.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: ADDITION value: +\'', () => {
      expect(mathTokenizer5.getNext()).to.eql({ type: 'ADDITION', value: '+' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 17 Minus
// ------------------------------------------------------------------------------

const mathTokenizer6 = new Tokenizer(arithmeticGrammar, '4 - 2')
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: MINUS value: -\'', () => {
      expect(mathTokenizer6.getNext()).to.eql({ type: 'MINUS', value: '-' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 18 Division
// ------------------------------------------------------------------------------

const mathTokenizer7 = new Tokenizer(arithmeticGrammar, '4 / 2')
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: DIVISION value: /\'', () => {
      expect(mathTokenizer7.getNext()).to.eql({ type: 'DIVISION', value: '/' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 19 Left-Parenthesis
// ------------------------------------------------------------------------------

const mathTokenizer8 = new Tokenizer(arithmeticGrammar, '4 / (2 + 2)')
mathTokenizer8.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: LEFT-PARENTHESIS value: (\'', () => {
      expect(mathTokenizer8.getNext()).to.eql({ type: 'LEFT-PARENTHESIS', value: '(' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 20 Right-Parenthesis
// ------------------------------------------------------------------------------

const mathTokenizer9 = new Tokenizer(arithmeticGrammar, '(2 + 3) * 5)')
mathTokenizer9.getNext()
mathTokenizer9.getNext()
mathTokenizer9.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: RIGHT-PARENTHESIS value: )\'', () => {
      expect(mathTokenizer9.getNext()).to.eql({ type: 'RIGHT-PARENTHESIS', value: ')' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 21 Maximal munch
// ------------------------------------------------------------------------------

const num = new Token('NUMBER', /^[0-9]/g)
const add = new Token('ADDITION', /^[+]/g)
const mul = new Token('MULTIPLICATION', /^[*]/g)
const float = new Token('FLOAT', /^[0-9]+\.[0-9]+/g)
const mathTokens = [num, add, mul, float]
const mathGrammar = new Grammar('mathGrammar', mathTokens)
const mathTokenizer10 = new Tokenizer(mathGrammar, '3 + 5.1')
mathTokenizer10.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: FLOAT value: 5.1\'', () => {
      expect(mathTokenizer10.getNext()).to.eql({ type: 'FLOAT', value: '5.1' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 22 Space Token
// ------------------------------------------------------------------------------
const spaceToken = new Token('SPACE', /^\s+/g)
wordAndDotGrammar.addToken(spaceToken)
const textTokenizer11 = new Tokenizer(wordAndDotGrammar, 'Himlen är klarblå.')
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should return \'type: SPACE value: s', () => {
      expect(textTokenizer11.getNext()).to.eql({ type: 'SPACE', value: ' ' })
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 23 Edge case: get next after END
// ------------------------------------------------------------------------------
wordAndDotGrammar.removeToken(spaceToken)
const textTokenizer12 = new Tokenizer(wordAndDotGrammar, 'Solen skiner.')
textTokenizer12.getNext()
textTokenizer12.getNext()
textTokenizer12.getNext()
describe('getNext', () => {
  describe('return value', () => {
    it('getNext() should throw an error', () => {
      expect(function () {
        textTokenizer12.getNext()
      }).to.throw('There is no more tokens')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 24 Edge case: get previous when active index token is at zero.
// ------------------------------------------------------------------------------
const textTokenizer13 = new Tokenizer(wordAndDotGrammar, 'Höstlöven faller ner.')
describe('getPrevious', () => {
  describe('return value', () => {
    it('getPrevious() should throw an error', () => {
      expect(function () {
        textTokenizer13.getPrevious()
      }).to.throw('There is no previous token.')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 25 Edge case: No string provided
// ------------------------------------------------------------------------------
const textTokenizer14 = new Tokenizer(wordAndDotGrammar)
describe('getFirst', () => {
  describe('return value', () => {
    it('getFirst() should return the type End and the value end', () => {
      expect(textTokenizer14.getFirst()).to.eql({ type: 'END', value: 'end' })
    })
  })
})
