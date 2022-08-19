/**
 * Sentences module
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import { Sentence } from './sentence.js'

/**
 * Represents sentences.
 *
 * @class
 */
export class Sentences {
  /**
   * Creates sentences.
   *
   */
  constructor () {
    this.sentences = []
  }

  /**
   * Parses a string into sentences.
   *
   * @param {object} tokenizer - A tokenizer.
   *
   * @returns {Array} An array with sentences.
   */
  parseIntoSentences (tokenizer) {
    let stopCondition = false
    while (stopCondition === false) {
      const sentence = this._parseOneSentence(tokenizer)
      this._checkSentence(sentence)
      this.sentences.push(sentence)
      const nextToken = tokenizer.getNext()
      stopCondition = this._checkDocumentEnd(nextToken)
      if (!stopCondition) {
        tokenizer.getPrevious()
      }
    }
    tokenizer.resetActiveTokenIndex()
    return this.sentences
  }

  /**
   * Parses one sentence.
   *
   * @param {object} tokenizer - A tokenizer.
   *
   * @returns {Array} A sentence.
   */
  _parseOneSentence (tokenizer) {
    let sentence = new Sentence()
    if (tokenizer.activeTokenIndex === 0) {
      sentence = this._addFirstToken(sentence, tokenizer)
    }
    sentence = this._addTokens(sentence, tokenizer)
    return sentence
  }

  /**
   * Adds the first matched token to the sentence.
   *
   * @param {object} sentence - A sentence.
   * @param {object} tokenizer - A tokenizer.
   *
   * @returns {object} A sentence.
   */
  _addFirstToken (sentence, tokenizer) {
    const firstToken = tokenizer.getFirst()
    sentence.addTokenMatch(firstToken)
    return sentence
  }

  /**
   * Adds matched tokens to the sentence.
   *
   * @param {object} sentence - A sentence.
   * @param {object} tokenizer - A tokenizer.
   *
   * @returns {object} A sentence.
   */
  _addTokens (sentence, tokenizer) {
    let stopCondition = false
    while (stopCondition === false) {
      const nextToken = tokenizer.getNext()
      if (this._checkSentenceEnd(nextToken)) {
        stopCondition = true
      } else if (this._checkDocumentEnd(nextToken)) {
        stopCondition = true
      }
      sentence.addTokenMatch(nextToken)
    }
    return sentence
  }

  /**
   * Checks a sentence.
   *
   * @param {object} sentenceToCheck - The sentence to check.
   */
  _checkSentence (sentenceToCheck) {
    const sentence = sentenceToCheck.getSentence()
    const lastSign = sentence[sentence.length - 1].getType()
    if (this._isDotFirst(sentence)) {
      this._throwAnError(sentence)
    } else if (this._isQuestionmarkFirst(sentence)) {
      this._throwAnError(sentence)
    } else if (this._isExclamationmarkFirst(sentence)) {
      this._throwAnError(sentence)
    } else if (!this._checkLastSign(lastSign)) {
      this._throwEndError()
    }
  }

  /**
   * Checks if a sentence begins with a dot.
   *
   * @param {object} sentenceToCheck - The sentence to check.
   *
   * @returns {boolean} true or false.
   */
  _isDotFirst (sentenceToCheck) {
    let dotFirstInSentence = false
    if (sentenceToCheck[0].getType() === 'DOT') {
      dotFirstInSentence = true
    }
    return dotFirstInSentence
  }

  /**
   * Checks if a sentence begins with a questionmark.
   *
   * @param {object} sentenceToCheck - The sentence to check.
   *
   * @returns {boolean} true or false.
   */
  _isQuestionmarkFirst (sentenceToCheck) {
    let questionmarkFirstInSentence = false
    if (sentenceToCheck[0].getType() === 'QUESTIONMARK') {
      questionmarkFirstInSentence = true
    }
    return questionmarkFirstInSentence
  }

  /**
   * Checks if a sentence begins with an exclamationmark.
   *
   * @param {object} sentenceToCheck - The sentence to check.
   *
   * @returns {boolean} true or false.
   */
  _isExclamationmarkFirst (sentenceToCheck) {
    let exclamationmarkFirstInSentence = false
    if (sentenceToCheck[0].getType() === 'EXCLAMATIONMARK') {
      exclamationmarkFirstInSentence = true
    }
    return exclamationmarkFirstInSentence
  }

  /**
   * Checks the last sign int the sentence.
   *
   * @param {string} lastSign - The sign to check.
   *
   * @returns {boolean} true or false.
   */
  _checkLastSign (lastSign) {
    let correctSign = true
    if (lastSign !== 'DOT' && lastSign !== 'QUESTIONMARK' && lastSign !== 'EXCLAMATIONMARK') {
      correctSign = false
    }
    return correctSign
  }

  /**
   * Throws an error.
   *
   * @param {object} sentence - The failed sentence.
   *
   */
  _throwAnError (sentence) {
    throw (new Error('FAILED: Sentence begins with ' + sentence[0].getValue()))
  }

  /**
   * Throws an error.
   *
   *
   */
  _throwEndError () {
    throw (new Error('FAILED: Sentence does not end with a dot, questionmark or exclamationmark.'))
  }

  /**
   * Checks if the document has ended.
   *
   * @param {object} token - A token.
   *
   * @returns {boolean} true or false.
   */
  _checkDocumentEnd (token) {
    let end = false
    if (token.getType() === 'END') {
      end = true
    }
    return end
  }

  /**
   * Checks if the sentence has ended.
   *
   * @param {object} token - A token.
   *
   * @returns {boolean} true or false.
   */
  _checkSentenceEnd (token) {
    let endOfSentence = false
    if (token.getType() === 'DOT' || token.getType() === 'QUESTIONMARK' || token.getType() === 'EXCLAMATIONMARK') {
      endOfSentence = true
    }
    return endOfSentence
  }
}
