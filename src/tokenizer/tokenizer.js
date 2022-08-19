/**
 * Tokenizer module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import { TokenMatch } from './tokenMatch.js'

/**
 * Represents a tokenizer.
 *
 * @class
 */
export class Tokenizer {
  /**
   * Creates a tokenizer.
   *
   * @param {object} grammar - The grammar which includes an array with token(s).
   * @param {string} stringToMatch - The string to match to tokens.
   */
  constructor (grammar, stringToMatch) {
    this.grammar = grammar
    this.stringToMatch = stringToMatch
    this.activeTokenIndex = 0
    this.result = this.getResult()
  }

  /**
   * Gets all the found token matches.
   *
   * @returns {Array} An array with found token types and token values.
   */
  getResult () {
    if (this._containsAvailableTokens()) {
      let foundTokens = this._matchStringToTokens()
      foundTokens = foundTokens.filter(tokenMatch => tokenMatch.getType() !== 'UNSPOTTED-SPACE')
      return foundTokens
    }
  }

  /**
   * Checks if there are available token(s) in an array in the provided grammar.
   *
   * @returns {boolean}.
   */
  _containsAvailableTokens () {
    const tokens = this.grammar.getTokens()
    if (Array.isArray(tokens) && tokens.length > 0) {
      return true
    } else {
      console.log('No available array including token(s)')
    }
  }

  /**
   * Matches the string to the provided tokens.
   *
   * @returns {Array} An array with found token types and token values.
   */
  _matchStringToTokens () {
    let stringToMatch = this._trimStringToMatch()
    let foundTokens = []
    let stopCondition = this._isEmpty(stringToMatch)
    while (stopCondition === false) {
      const nextToken = this._getNextMatch(stringToMatch)
      stringToMatch = stringToMatch.slice(this._checkTokenLength(nextToken))
      foundTokens.push(nextToken)
      stopCondition = this._isEmpty(stringToMatch)
    }
    foundTokens = this._addEndToken(foundTokens)
    return foundTokens
  }

  /**
   * Checks if there is a stringToMatch. Removes any first and last spaces.
   *
   * @returns {string} the string to match to tokens.
   */
  _trimStringToMatch () {
    if (this.stringToMatch) {
      this.stringToMatch = this.stringToMatch.trim()
    }
    return this.stringToMatch
  }

  /**
   * Checks if the string to match to tokens is empty.
   *
   * @param {string} stringToMatch - The string to match to tokens.
   *
   * @returns {boolean} true or false.
   */
  _isEmpty (stringToMatch) {
    if (this.stringToMatch) {
      let isEmpty = false
      if (stringToMatch.length === 0) {
        isEmpty = true
      } return isEmpty
    }
  }

  /**
   * Matches the next token.
   *
   * @param {string} stringToMatch - The string to match to tokens.
   * @returns {object} the next token.
   */
  _getNextMatch (stringToMatch) {
    const tokens = this.grammar.getTokens()
    const winnerToken = this._getNextWinnerToken(stringToMatch, tokens)
    if (winnerToken.value.length === 0) {
      this._assignOtherType(stringToMatch, winnerToken)
    }
    return winnerToken
  }

  /**
   * Gets the next match.
   *
   * @param {string} stringToMatch the string to match to tokens.
   * @returns {object} the winnerToken.
   */
  _getNextWinnerToken (stringToMatch) {
    const winnerToken = this.grammar.getNextWinnerToken(stringToMatch)
    return winnerToken
  }

  /**
   * Checks if the token should have the type FAILED or UNSPOTTED-SPACE.
   *
   * @param {string} stringToMatch the string to match tokens to.
   * @param {object} winnerToken the current winnerToken.
   * @returns {object} the winnerToken.
   */
  _assignOtherType (stringToMatch, winnerToken) {
    if (stringToMatch[0] !== ' ') {
      winnerToken.setType('FAILED')
      winnerToken.setValue(stringToMatch[0])
    } else {
      winnerToken.setType('UNSPOTTED-SPACE')
      winnerToken.setValue('unspotted-space')
    }
    return winnerToken
  }

  /**
   * Checks the length of the token.
   *
   * @param {object} token A token.
   * @returns {object} the length of the token.
   */
  _checkTokenLength (token) {
    let length = token.value.length
    if (token.getType() === 'FAILED' || token.getType() === 'UNSPOTTED-SPACE') {
      length = 1
    }
    return length
  }

  /**
   * Adds an endtoken.
   *
   * @param {Array} foundTokens - The found tokens.
   *
   * @returns {Array} An array with found token types and token values.
   */
  _addEndToken (foundTokens) {
    const endToken = new TokenMatch('END', 'end')
    foundTokens.push(endToken)
    return foundTokens
  }

  /**
   * Gets the first token.
   *
   * @returns {object} A token.
   */
  getFirst () {
    const firstToken = this.result[0]
    this._checksTokens(firstToken)
    return firstToken
  }

  /**
   * Gets the next token.
   *
   * @returns {object} A token.
   */
  getNext () {
    this._checkBeforeGetNext()
    this.activeTokenIndex++
    const nextToken = this.result[this.activeTokenIndex]
    this._checksTokens(nextToken)
    return nextToken
  }

  /**
   * Gets the previous token.
   *
   * @returns {object} A token.
   */
  getPrevious () {
    this._checkBeforeGetPrevious()
    this.activeTokenIndex--
    const previousToken = this.result[this.activeTokenIndex]
    return previousToken
  }

  /**
   * Checks if the active token index is zero.
   *
   */
  _checkBeforeGetPrevious () {
    if (this.activeTokenIndex === 0) {
      throw (new Error('There is no previous token.'))
    }
  }

  /**
   * Checks active token index.
   *
   */
  _checkBeforeGetNext () {
    const token = this.result[this.activeTokenIndex]
    const type = token.getType()
    if (type === 'END') {
      throw (new Error('There is no more tokens.'))
    }
  }

  /**
   * Checks for failed tokens.
   *
   * @param {object} token - the token.
   */
  _checksTokens (token) {
    if (token.getType() === 'FAILED') {
      throw (new Error('FAILED TOKENMATCH: ' + token.getValue()))
    }
  }

  /**
   * Gets token types and token values based on active token index.
   *
   * @returns {Array} Token(s).
   */
  getTokenMatch () {
    let tokenMatch
    if (this.activeTokenIndex > 0) {
      tokenMatch = this.result.slice(0, this.activeTokenIndex + 1)
    } else {
      tokenMatch = this.result[0]
    }
    return tokenMatch
  }

  /**
   * Resets active token index.
   *
   */
  resetActiveTokenIndex () {
    this.activeTokenIndex = 0
  }
}
