/**
 * Token module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents a token.
 *
 * @class
 */
export class Token {
  /**
   * The name and regular expression of the Token.
   *
   * @param {string} name - The name of the Token.
   * @param {string} regularExpression - A regular expression.
   */
  constructor (name, regularExpression) {
    this.name = name
    this.regularExpression = regularExpression
  }

  /**
   * Gets the name of the token.
   *
   * @returns {string} Token name.
   */
  getName () {
    return this.name
  }

  /**
   * Gets the regular expression of the token.
   *
   * @returns {string} Regular expression.
   */
  getRegularExpression () {
    return this.regularExpression
  }
}
