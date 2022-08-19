# The Parser Module
The parser module uses the Tokenizer module. It creates a tokenizer that converts a string of characters into following tokens: WORD, DOT, QUESTIONMARK and EXCLAMATIONMARK. The purpose of the parser is to convert a text into sentences with the help of the tokenizer. The parser can distinguish between sentences that end with a dot, questionmark and an exclamationmark.

# CLASSES

# Document

A class that represents a document. <br>
The constructor takes one argument: A string with text.<br>
Document is dependent on the following classes: Parser, Sentences, DotSentences, ExclamationSentences and QuestionSentences.

## Public methods

### `getSentences ()`
Returns an array with sentences.

### `getAllDotSentences ()`
Returns an array with all the sentences that end with a dot.

### `getAllQuestionmarkSentences ()`
Returns an array with all the sentences that end with a questionmark.

### `getAllExclamationmarkSentences ()`
Returns an array with all the sentences that end with an exclamationmark.

### `getOneSentence (index)`
Returns one sentence in a string. 

### `getSentence (sentence)`
Returns a sentence as an array.

### `getSentenceType (sentence)`
Returns what type of sentence it is (dot, questionmark or exclamationmark).

### `sentenceToString (sentence)`
Returns a sentence as a string.

### `countNumberOfWords (sentence)`
Returns the number of words a sentence consists of.

# Parser

A class that represents a parser. <br>
The constructor takes one argument: A string with text.<br>
Parser is dependent on the classes Tokenizer, Grammar and Token.

## Public methods

### `createTokenizer ()`
Creates and returns a specific tokenizer that distinguishes between words, dots, exclamationmarks and questionmarks.

# Sentences

A class that represents an array with sentences. <br>
Sentences is dependent on the class Sentence.

## Public methods

### `parseIntoSentences (tokenizer)`
Converts a text into sentences and returns an array with sentences.

# DotSentences

A class that represent an array with sentences that end with a dot.<br>

## Public methods

### `getAllDotSentences (sentences)`
Returns an array with sentences that end with a dot.

# QuestionSentences

A class that represent an array with sentences that end with a questionmark.<br>

## Public methods

### `getAllQuestionSentences (sentences)`
Returns an array with sentences that end with questions.

# ExclamationSentences

A class that represents an array with sentences that end with an exclamationmark.<br>

## Public methods

### `getAllExclamationSentences (sentences)`
Returns an array with sentences that end with an exclamationmark.

# Sentence

A class that represent a sentence. <br>

## Public methods

### `addTokenMatch (token)`
Adds a matched token to a sentence.

### `getSentence ()`
Returns a sentence consisting of an array with matched tokens.

### `countNumberOfWords ()`
Returns the number of words a sentence consists of.

### `getSentenceType ()`
Returns what type of sentence it is.

### `sentenceToString ()`
Returns a sentence in a string.

## Run the code
1. Npm install
2. Npm start

## Run tests
npm test