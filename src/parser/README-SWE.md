# Modulen Parser
Modulen Parser använder sig av modulen Tokenizer. Den skapar en tokenizer som bryter ner en sträng med tecken till följande enheter: WORD, DOT, QUESTIONMARK och EXCLAMATIONMARK. Syftet med parsern är att med hjälp av denna tokenizer dela in en text i meningar. Parsern kan urskilja på meningar som avslutas med punkt, frågetecken eller utropstecken. 

# KLASSER

# Document

En klass som representerar ett dokument. <br>
Konstruktorn tar emot ett argument: En sträng med text. <br>
Document är beroende av klasserna Parser, Sentences, DotSentences, ExclamationSentences och QuestionSentences.

## Publika metoder

### `getSentences ()`
Returnerar en array med meningar.

### `getAllDotSentences ()`
Returnerar en array med alla meningar som avslutas med en punkt.

### `getAllQuestionmarkSentences ()`
Returnerar en array med alla meningar som avslutas med ett frågetecken.

### `getAllExclamationmarkSentences ()`
Returnerar en array med alla meningar som avslutas med utropstecken.

### `getOneSentence (index)`
Returnerar en mening i en sträng.

### `getSentence (sentence)`
Returnerar en mening som en array.

### `getSentenceType (sentence)`
Returnerar vilken typ av mening det är (punkt, frågetecken, eller utropstecken).

### `sentenceToString (sentence)`
Returnerar en mening som en sträng.

### `countNumberOfWords (sentence)`
Returnerar antal ord en mening består av.

# Parser

En klass som representerar en parser. <br>
Konstruktorn tar emot ett argument: En sträng med text. <br>
Parser är beroende av klasserna Tokenizer, Grammar och Token.

## Publika metoder

### `createTokenizer ()`
Skapar och returnerar en specifik tokenizer som urskiljer ord, punkter, utropstecken och frågetecken.

# Sentences

En klass som representerar en samling meningar. <br>
Sentences är beroende av klassen Sentence.

## Publika metoder

### `parseIntoSentences (tokenizer)`
Delar upp en text i meningar och returnerar en array med meningar.

# DotSentences

En klass som representerar en samling meningar som avslutas med punkt. <br>

## Publika metoder

### `getAllDotSentences (sentences)`
Returnerar en array med meningar som avslutas med punkt.

# QuestionSentences

En klass som representerar en samling meningar som avslutas med frågetecken. <br>

## Publika metoder

### `getAllQuestionSentences (sentences)`
Returnerar en array med meningar som avslutas med frågor.

# ExclamationSentences

En klass som representerar en samling meningar som avslutas med utropstecken. <br>

## Publika metoder

### `getAllExclamationSentences (sentences)`
Returnerar en array med meningar som avslutas med utropstecken.

# Sentence

En klass som representerar en mening. <br>

## Publika metoder

### `addTokenMatch (token)`
Lägger till en matchad token till en mening.

### `getSentence ()`
Returnerar en mening bestående av en array med matchade tokens.

### `countNumberOfWords ()`
Returnerar antal ord en mening består av.

### `getSentenceType ()`
Returnerar vilken typ av mening det är.

### `sentenceToString ()`
Returnerar en mening som en sträng.

## Kör koden
1. Npm install
2. Npm start

## Kör tester
npm test