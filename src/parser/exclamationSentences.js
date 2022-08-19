/**
 * Exclamation mark sentences module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents exclamation mark sentences.
 *
 * @class
 */
export class ExclamationSentences {
  /**
   * Creates exclamation mark sentences.
   *
   */
  constructor () {
    this.exclamationSentences = []
  }

  /**
   * Returns all exclamation mark sentences.
   *
   * @param {object} sentences Sentences.
   *
   * @returns {Array} An array with the exclamationmark-sentences.
   */
  getAllExclamationSentences (sentences) {
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i]
      const sentenceType = sentence.getSentenceType()
      if (sentenceType === 'EXCLAMATIONMARK') {
        this.exclamationSentences.push(sentence)
      }
    }
    return this.exclamationSentences
  }
}
