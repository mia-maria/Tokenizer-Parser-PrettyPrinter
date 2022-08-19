/**
 * Tests for the parser module.
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import chai from 'chai'
import { Document } from '../src/parser/document.js'

const expect = chai.expect

// ------------------------------------------------------------------------------
//  Testcase 1 Parse sentences.
// ------------------------------------------------------------------------------

const document1 = new Document('Hello. I love parsers! Do you? They are great!')
const sentences1 = document1.getSentences()
const numberOfSentences = sentences1.length

describe('Number of sentences', () => {
  describe('return value', () => {
    it('Number of sentences should be 4', () => {
      expect(numberOfSentences).to.equal(4)
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 2 Parse sentences.
// ------------------------------------------------------------------------------

const document2 = new Document('a.b.')
const sentences2 = document2.getSentences()
const amountOfSentences = sentences2.length

describe('Number of sentences', () => {
  describe('return value', () => {
    it('Number of sentences should be 2', () => {
      expect(amountOfSentences).to.equal(2)
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 3 Count number of words in a sentence.
// ------------------------------------------------------------------------------

const document3 = new Document('a! b c?')
const sentences3 = document3.getSentences()
const sentence3 = sentences3[1]
const numberOfWords = document3.countNumberOfWords(sentence3)

describe('Second sentence', () => {
  describe('return value', () => {
    it('Second sentence should contain two words', () => {
      expect(numberOfWords).to.equal(2)
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 4 Count number of words in a sentence.
// ------------------------------------------------------------------------------

const document4 = new Document('Hello! Nice to see you again! How are you?')
const sentences4 = document4.getSentences()
const sentence4 = sentences4[2]
const amountOfWords = document4.countNumberOfWords(sentence4)

describe('Third sentence', () => {
  describe('return value', () => {
    it('Third sentence should contain 3 words', () => {
      expect(amountOfWords).to.equal(3)
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 5 Check if a sentence ends with an exclamationmark.
// ------------------------------------------------------------------------------

const document5 = new Document('a!')
const sentences5 = document5.getSentences()
const sentence5 = sentences5[0]
const sentenceType = document5.getSentenceType(sentence5)

describe('The first sentence', () => {
  describe('return value', () => {
    it('The first sentence should end with an exclamationmark', () => {
      expect(sentenceType).to.equal('EXCLAMATIONMARK')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 6 Check if a sentence ends with a dot.
// ------------------------------------------------------------------------------

const document6 = new Document('Hi! Do you want to come over? We can watch a movie.')
const sentences6 = document6.getSentences()
const sentence6 = sentences6[2]
const sentenceType2 = document6.getSentenceType(sentence6)

describe('The third sentence', () => {
  describe('return value', () => {
    it('The third sentence should end with a dot', () => {
      expect(sentenceType2).to.equal('DOT')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 7 Check if a sentence ends with a questionmark.
// ------------------------------------------------------------------------------

const document7 = new Document('Hi! nice to see you! Do you want some coffe?')
const sentences7 = document7.getSentences()
const sentence7 = sentences7[2]
const sentenceType3 = document7.getSentenceType(sentence7)

describe('The third sentence', () => {
  describe('return value', () => {
    it('The third sentence should end with a questionmark', () => {
      expect(sentenceType3).to.equal('QUESTIONMARK')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 8 Check word in sentence.
// ------------------------------------------------------------------------------

const document8 = new Document('a bc.')
const sentences8 = document8.getSentences()
let sentence8 = sentences8[0]
sentence8 = document8.getSentence(sentence8)
const word = sentence8[1]

describe('The first sentence', () => {
  describe('return value', () => {
    it('The second word should equal bc', () => {
      expect(word.value).to.equal('bc')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 9 Check word in sentence.
// ------------------------------------------------------------------------------

const document9 = new Document('Det är en fin höstdag. Jag balanserar på stenar med barnen. Och njuter av den friska luften.')
const sentences9 = document9.getSentences()
let sentence9 = sentences9[1]
sentence9 = document9.getSentence(sentence9)
const word2 = sentence9[1]

describe('The second sentence', () => {
  describe('return value', () => {
    it('The second word should equal balanserar', () => {
      expect(word2.value).to.equal('balanserar')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 10 Get one sentence to a string.
// ------------------------------------------------------------------------------

const document10 = new Document('Vi planerar för Halloween. Dottern vill vara en häxa. Sonen vill vara ett spöke.')
const sentenceTest10 = document10.getOneSentence(2)

describe('The third sentence', () => {
  describe('return value', () => {
    it('The third sentence should be: Sonen vill vara ett spöke.', () => {
      expect(sentenceTest10).to.equal('Sonen vill vara ett spöke.')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 11 Get all dot sentences
// ------------------------------------------------------------------------------

const document11 = new Document('Hej! Den här meningen slutar med en punkt. Det gör den här meningen också.')
const dotSentences = document11.getAllDotSentences()
let dotSentence = dotSentences[0]
dotSentence = document11.sentenceToString(dotSentence)

describe('The first sentence', () => {
  describe('return value', () => {
    it('The first sentence should be: Den här meningen slutar med en punkt.', () => {
      expect(dotSentence).to.equal('Den här meningen slutar med en punkt.')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 12 Get all exclamation sentences
// ------------------------------------------------------------------------------

const document12 = new Document('Hej! Ebba fyller år idag. Hipp hipp hurra! Grattis!')
const exclamationSentences = document12.getAllExclamationmarkSentences()
let exclamationSentence = exclamationSentences[1]
exclamationSentence = document12.sentenceToString(exclamationSentence)

describe('The second sentence', () => {
  describe('return value', () => {
    it('The second sentence should be: Hipp hipp hurra!', () => {
      expect(exclamationSentence).to.equal('Hipp hipp hurra!')
    })
  })
})

// ------------------------------------------------------------------------------
//  Testcase 13 Get all question sentences
// ------------------------------------------------------------------------------

const document13 = new Document('Hej! Vill du gå på en skogspromenad? Vi kan plocka bär. Lite senare idag?')
const questionSentences = document13.getAllQuestionmarkSentences()
let questionSentence = questionSentences[0]
questionSentence = document13.sentenceToString(questionSentence)

describe('The first sentence', () => {
  describe('return value', () => {
    it('The first sentence should be: Vill du gå på en skogspromenad?', () => {
      expect(questionSentence).to.equal('Vill du gå på en skogspromenad?')
    })
  })
})
