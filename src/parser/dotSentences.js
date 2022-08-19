/**
 * Dot sentences module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents dot sentences.
 *
 * @class
 */
export class DotSentences {
  /**
   * Creates dot sentences.
   *
   */
  constructor () {
    this.dotSentences = []
  }

  /**
   * Returns all dot sentences.
   *
   * @param {object} sentences Sentences.
   *
   * @returns {Array} An array with the dot-sentences.
   */
  getAllDotSentences (sentences) {
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i]
      const sentenceType = sentence.getSentenceType()
      if (sentenceType === 'DOT') {
        this.dotSentences.push(sentence)
      }
    }
    return this.dotSentences
  }
}
