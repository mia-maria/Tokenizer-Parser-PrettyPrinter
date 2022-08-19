/**
 * Document module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import { Parser } from './parser.js'
import { Sentences } from './sentences.js'
import { DotSentences } from './dotSentences.js'
import { ExclamationSentences } from './exclamationSentences.js'
import { QuestionSentences } from './questionSentences.js'

/**
 * Represents a document.
 *
 * @class
 */
export class Document {
  /**
   * Creates a document.
   *
   * @param {string} stringToParse - The string to parse into sentences.
   *
   */
  constructor (stringToParse) {
    this.stringToParse = stringToParse
    this.tokenizer = this._createTokenizer()
    this.sentences = this.getSentences()
  }

  /**
   * Creates a tokenizer.
   *
   * @returns {object} A tokenizer.
   */
  _createTokenizer () {
    const parser = new Parser(this.stringToParse)
    const tokenizer = parser.createTokenizer()
    return tokenizer
  }

  /**
   * Gets sentences.
   *
   * @returns {Array} An array with sentences.
   */
  getSentences () {
    let sentences = new Sentences()
    sentences = sentences.parseIntoSentences(this.tokenizer)
    return sentences
  }

  /**
   * Gets sentences ending with dots.
   *
   * @returns {Array} An array with sentences ending with dots.
   */
  getAllDotSentences () {
    let dotSentences = new DotSentences()
    dotSentences = dotSentences.getAllDotSentences(this.sentences)
    return dotSentences
  }

  /**
   * Gets sentences ending with questionmarks.
   *
   * @returns {Array} An array with sentences ending with questionmarks.
   */
  getAllQuestionmarkSentences () {
    let questionmarkSentences = new QuestionSentences()
    questionmarkSentences = questionmarkSentences.getAllQuestionSentences(this.sentences)
    return questionmarkSentences
  }

  /**
   * Gets sentences ending with exclamationmarks.
   *
   * @returns {Array} An array with sentences ending with exclamationmarks.
   */
  getAllExclamationmarkSentences () {
    let exclamationmarkSentences = new ExclamationSentences()
    exclamationmarkSentences = exclamationmarkSentences.getAllExclamationSentences(this.sentences)
    return exclamationmarkSentences
  }

  /**
   * Get a sentence in a string.
   *
   * @param {index} index - The index of the sentence.
   * @returns {string} One sentence in a string (with one white space between each word).
   */
  getOneSentence (index) {
    const sentence = this.sentences[index]
    const sentenceToString = sentence.sentenceToString()
    return sentenceToString
  }

  /**
   * Gets an array with the sentence.
   *
   * @param {object} sentence - The sentence.
   *
   * @returns {Array} An array with the sentence.
   */
  getSentence (sentence) {
    return sentence.getSentence()
  }

  /**
   * Gets the type of the sentence.
   *
   * @param {object} sentence - The sentence.
   *
   * @returns {string} The type of the sentence.
   */
  getSentenceType (sentence) {
    const sentenceType = sentence.getSentenceType()
    return sentenceType
  }

  /**
   * Get a sentence in a string.
   *
   * @param {object} sentence - The sentence.
   *
   * @returns {string} One sentence in a string (with one white space between each word).
   */
  sentenceToString (sentence) {
    return sentence.sentenceToString()
  }

  /**
   * Counts the number of words in the sentence.
   *
   * @param {object} sentence - The sentence.
   *
   * @returns {number} Number of words.
   */
  countNumberOfWords (sentence) {
    const numberOfWords = sentence.countNumberOfWords()
    return numberOfWords
  }
}
