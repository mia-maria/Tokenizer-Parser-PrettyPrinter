/**
 * Question sentences module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents question sentences.
 *
 * @class
 */
export class QuestionSentences {
  /**
   * Creates question sentences.
   *
   */
  constructor () {
    this.questionSentences = []
  }

  /**
   * Returns all question sentences.
   *
   * @param {object} sentences Sentences.
   *
   * @returns {Array} An array with the question-sentences.
   */
  getAllQuestionSentences (sentences) {
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i]
      const sentenceType = sentence.getSentenceType()
      if (sentenceType === 'QUESTIONMARK') {
        this.questionSentences.push(sentence)
      }
    }
    return this.questionSentences
  }
}
