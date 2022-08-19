/**
 * Token Match module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents a token match.
 *
 * @class
 */
export class TokenMatch {
  /**
   * The type and value of the token match.
   *
   * @param {string} type - The type of the Token Match.
   * @param {string} value - The value of the Token Match.
   */
  constructor (type, value) {
    this.type = type
    this.value = value
  }

  /**
   * Gets the type of the token match.
   *
   * @returns {string} Token match type.
   */
  getType () {
    return this.type
  }

  /**
   * Gets the value of the token match.
   *
   * @returns {string} Token match value.
   */
  getValue () {
    return this.value
  }

  /**
   * Sets the type of the token match.
   *
   * @param {string} type - The type of the Token.
   */
  setType (type) {
    this.type = type
  }

  /**
   * Sets the value of the token match.
   *
   * @param {string} value - The value of the Token.
   */
  setValue (value) {
    this.value = value
  }
}
