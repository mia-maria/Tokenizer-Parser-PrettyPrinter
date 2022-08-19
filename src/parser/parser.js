/**
 * Parser module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import { Tokenizer } from '../tokenizer/tokenizer.js'
import { Grammar } from '../tokenizer/grammar.js'
import { Token } from '../tokenizer/token.js'

/**
 * Represents a parser.
 *
 * @class
 */
export class Parser {
  /**
   * Creates a parser.
   *
   * @param {string} stringToParse - The string to parse into sentences.
   *
   */
  constructor (stringToParse) {
    this.stringToParse = stringToParse
    this.tokenizer = this.createTokenizer()
  }

  /**
   * Creates a tokenizer.
   *
   * @returns {object} A tokenizer.
   */
  createTokenizer () {
    const wordToken = new Token('WORD', /^[\w|åäöÅÄÖ]+/g)
    const dotToken = new Token('DOT', /^\./g)
    const questionMarkToken = new Token('QUESTIONMARK', /^\?/g)
    const exclamationMarkToken = new Token('EXCLAMATIONMARK', /^!/g)
    const tokens = [wordToken, dotToken, questionMarkToken, exclamationMarkToken]
    const wordAndDotGrammar = new Grammar('wordAndDotGrammar', tokens)
    const tokenizer = new Tokenizer(wordAndDotGrammar, this.stringToParse)
    return tokenizer
  }
}
