/**
 * Grammar module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import { TokenMatch } from './tokenMatch.js'

/**
 * Represents a grammar.
 *
 * @class
 */
export class Grammar {
  /**
   * Creates a grammar.
   *
   * @param {string} name - The name of the Grammar.
   * @param {Array} tokens - An array with token(s).
   */
  constructor (name, tokens) {
    this.name = name
    this.tokens = tokens
  }

  /**
   * Gets an array with tokens.
   *
   * @returns {Array} An array with tokens.
   */
  getTokens () {
    return this.tokens
  }

  /**
   * Adds a token to the array.
   *
   * @param {object} token A token.
   */
  addToken (token) {
    if (Array.isArray(this.tokens)) {
      this.tokens.push(token)
    } else {
      this.tokens = [token]
    }
  }

  /**
   * Removes a token from the array.
   *
   * @param {object} tokenToRemove A token.
   */
  removeToken (tokenToRemove) {
    if (Array.isArray(this.tokens)) {
      this.tokens = this.tokens.filter(token => token.getName() !== tokenToRemove.getName())
    }
  }

  /**
   * Gets the next match.
   *
   * @param {string} stringToMatch the string to match to tokens.
   * @returns {object} the winnerToken.
   */
  getNextWinnerToken (stringToMatch) {
    let winnerToken = new TokenMatch('', '')
    for (let i = 0; i < this.tokens.length; i++) {
      const regularExpression = this.tokens[i].getRegularExpression()
      const result = stringToMatch.match(regularExpression)
      if (result) {
        winnerToken = this._checkWinnerToken(result, winnerToken, this.tokens[i])
      }
    }
    return winnerToken
  }

  /**
   * Checks for maximal munch, that is which token has the longest match.
   *
   * @param {Array} result the current result from the string to match.
   * @param {object} winnerToken the current winnerToken.
   * @param {object} token the token.
   *
   * @returns {object} the winnerToken.
   */
  _checkWinnerToken (result, winnerToken, token) {
    const winnerTokenValue = winnerToken.getValue()
    const winnerTokenLength = winnerTokenValue.length
    if (result.toString().length > winnerTokenLength) {
      const winnerTokenType = token.getName()
      winnerToken.setType(winnerTokenType)
      const winnerTokenValue = result.toString()
      winnerToken.setValue(winnerTokenValue)
    }
    return winnerToken
  }
}
