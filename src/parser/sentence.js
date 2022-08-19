/**
 * Sentence module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents a sentence.
 *
 * @class
 */
export class Sentence {
  /**
   * Creates a sentence.
   *
   */
  constructor () {
    this.sentence = []
  }

  /**
   * Adds a token match to the array.
   *
   * @param {object} token A token.
   */
  addTokenMatch (token) {
    if (Array.isArray(this.sentence)) {
      this.sentence.push(token)
    } else {
      this.sentence = [token]
    }
  }

  /**
   * Gets an array with the sentence.
   *
   * @returns {Array} An array with the sentence.
   */
  getSentence () {
    return this.sentence
  }

  /**
   * Counts the number of words in the sentence.
   *
   * @returns {number} Number of words.
   */
  countNumberOfWords () {
    let numberOfWords = 0
    for (let i = 0; i < this.sentence.length; i++) {
      if (this.sentence[i].getType() === 'WORD') {
        numberOfWords++
      }
    }
    return numberOfWords
  }

  /**
   * Checks the type of the sentence.
   *
   * @returns {string} sentence type.
   */
  getSentenceType () {
    const lastToken = this.sentence[this.sentence.length - 1]
    const sentenceType = lastToken.getType()
    return sentenceType
  }

  /**
   * Get a sentence in a string.
   *
   * @returns {string} One sentence in a string (with one white space between each word).
   */
  sentenceToString () {
    const firstToken = this.sentence[0]
    let sentenceToString = firstToken.getValue()
    for (let i = 1; i < this.sentence.length; i++) {
      const token = this.sentence[i]
      sentenceToString = this._concatenateString(sentenceToString, token)
    }
    return sentenceToString
  }

  /**
   * Concatenates a sentence.
   *
   * @param {string} sentence  A sentence.
   * @param {object} token A token.
   *
   * @returns {string} One sentence in a string.
   */
  _concatenateString (sentence, token) {
    const tokenType = token.getType()
    if (tokenType === 'DOT' || tokenType === 'QUESTIONMARK' || tokenType === 'EXCLAMATIONMARK') {
      sentence = sentence + token.getValue()
    } else {
      sentence = sentence + ' ' + token.getValue()
    }
    return sentence
  }
}
