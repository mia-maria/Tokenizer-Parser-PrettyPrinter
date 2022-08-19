# Tokenizer

Represents a tokenizer which converts a string of characters into tokens. <br>
The constructor takes 2 parameters: <br>
1. A grammar, which includes the grammar name and an array with tokens (a token includes a regular expression). <br>
2. A string to match to tokens. <br>
The tokenizer depends on the classes Grammar, Token and TokenMatch. 

### Example

const wordToken = new Token('WORD', /^[\w|åäöÅÄÖ]+/g) <br>
const dotToken = new Token('DOT', /^\./g) <br>
const tokens = [wordToken, dotToken] <br>
const wordAndDotGrammar = new Grammar('wordAndDotGrammar', tokens) <br>
const tokenizer = new Tokenizer(wordAndDotGrammar, 'Himlen är klarblå.') <br>
tokenizer.getNext() <br>
tokenizer.getTokenMatch() <br>
tokenizer.getResult() <br>

## Observe

In order to make the tokenizer work the regular expression used should start with /^ as in the example above.
Reserved words for the Token Type: FAILED and UNSPOTTED SPACE.

## Public Methods

### `getResult ()`
Returns an array with all the found token types and token values, including both successful and failed tokenmatches.

### `getFirst ()`
Returns the first found token. Logs an error-message if the first token is a failed tokenmatch.

### `getNext ()`
Returns the next found token based on an activeTokenIndex (the activeTokenIndex keeps track of which token is active in the result sequence). Increases the activeTokenIndex. Logs an error-message if the token is a failed tokenmatch.

### `getPrevious ()`
Returns the previous token based on an activeTokenIndex. Subtracts the activeTokenIndex. Logs an error-message if there is no previous token to get.

### `getTokenMatch ()`
Gets all the token types and token values up to the active token index. Both successful and failed tokens are returned.

### `resetActiveTokenIndex ()`
Resets active token index, in order to be able to step through the result again if needed.

# Grammar
Represents a grammar. The constructor takes 2 parameters: 1. Name 2. An array with tokens. Depends on the class Token.

## Public Methods

### `getTokens ()`
Gets an array with tokens.

### `addToken (token)`
Adds a token to the array.

### `removeToken (tokenToRemove)`
Removes a token from the array.

### `getNextWinnerToken(stringToMatch)`
Gets the next match. Calls on the private method _checkWinnerToken, which checks for maximal munch, that is which token has the longest match.

### Example
const wordToken = new Token('WORD', /^[\w|åäöÅÄÖ]+/g) <br>
const dotToken = new Token('DOT', /^\./g) <br>
const tokens = [wordToken, dotToken] <br>
const wordAndDotGrammar = new Grammar('wordAndDotGrammar', tokens) <br>
const spaceToken = new Token('SPACE', /^\s+/g) <br>
wordAndDotGrammar.addToken(spaceToken) <br>

# Token
Represents a token. The constructor takes 2 parameters: 1. Name 2. A regular expression.

## Public Methods

### `getName ()`
Returns the name of the token.

### `getRegularExpression ()`
Returns the regular expression of the token.

### Example
const numberToken = new Token('NUMBER', /^[0-9]/g) <br>
const floatToken = new Token('FLOAT', /^[0-9]+\.[0-9]+/g) <br>
const addToken = new Token('ADD', /^[+]/g) <br>
const mulToken = new Token('MUL', /^[*]/g) <br>

# TokenMatch
A class that represents a token match <br>
The constructor takes 2 parameters: 1. Type 2. Value

## Public methods

### `getType ()`
Returns the type of the token match.

### `getValue ()`
Returns the value of the token match.

### `setType ()`
Sets the type of the token match.

### `setValue ()`
Sets the value of the token match.

## Run the code
1. Npm install
2. Npm start

## Run tests
npm test