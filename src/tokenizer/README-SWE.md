# Tokenizer

En klass som representerar en tokeniserare. Tokeniseraren förvandlar en sträng med tecken till mindre delar, så kallade "tokens". <br>
Konstruktorn tar två argument: <br>
1. En grammatik, som inkluderar grammatikens namn och en array med tokens (ett token inkluderar i sin tur ett reguljärt uttryck). <br>
2. En sträng med tecken som ska matchas mot tokens. <br>
Tokeniseraren är beroende av klasserna Grammar, Token och TokenMatch.

### Exempel

const wordToken = new Token('WORD', /^[\w|åäöÅÄÖ]+/g) <br>
const dotToken = new Token('DOT', /^\./g) <br>
const tokens = [wordToken, dotToken] <br>
const wordAndDotGrammar = new Grammar('wordAndDotGrammar', tokens) <br>
const tokenizer = new Tokenizer(wordAndDotGrammar, 'Himlen är klarblå.') <br>
tokenizer.getNext() <br>
tokenizer.getTokenMatch() <br>
tokenizer.getResult() <br>

## Obs

För att tokeniseraren ska fungera behöver det reguljära uttryck som används börja med /^ som i exemplet ovan. <br>
Reserverade ord för Token type: FAILED och UNSPOTTED SPACE.

## Publika metoder

### `getResult ()`
Returnerar en array med alla tokens, både lyckade och misslyckade matchningar.

### `getFirst ()`
Returnerar det första token som hittas. Ett felmeddelande skrivs ut om matchningen har misslyckats.

### `getNext ()`
Returnerar nästa token baserat på vilket token i sekvensen som är aktivt (activeTokenIndex håller reda på vilket token som är aktivt.) ActiveTokenIndex ökar med ett steg. Ett felmeddelande skrivs ut om matchningen har misslyckats.

### `getPrevious ()`
Returnerar föregående token baserat på vilket token i sekvensen som är aktivt. ActiveTokenIndex minskar med ett steg. Ett felmeddelande skrivs ut om matchningen har misslyckats.

### `getTokenMatch ()`
Returnerar alla tokens fram till det token i sekvensen som är aktivt, både lyckade och misslyckade tokens returneras.

### `resetActiveTokenIndex ()`
Återställer active token index, ifall om man vill kunna stega igenom resultatet igen.

# Grammar
En klass som representerar den grammatik som behövs för att tokeniseraren ska kunna göra en lexikalanalys. <br> 
Konstruktorn tar två parametrar: 1. Namn 2. En array med tokens. <br>
Grammar är beroende av klassen Token. <br>

## Publika Metoder

### `getTokens ()`
Returnerar de tokens grammatiken består av.

### `addToken (token)`
Lägger till en token till grammatiken.

### `removeToken (tokenToRemove)`
Tar bort en befintlig token från grammatiken

### `getNextWinnerToken(stringToMatch)`
Returnerar nästa matchning. Anropar den privata metoden _checkWinnerToken, vilken i sin tur kontrollerar maximal munch, det vill säga vilket token som har den längsta matchningen.

### Example
const wordToken = new Token('WORD', /^[\w|åäöÅÄÖ]+/g) <br>
const dotToken = new Token('DOT', /^\./g) <br>
const tokens = [wordToken, dotToken] <br>
const wordAndDotGrammar = new Grammar('wordAndDotGrammar', tokens) <br>
const spaceToken = new Token('SPACE', /^\s+/g) <br>
wordAndDotGrammar.addToken(spaceToken) <br>

# Token
En klass som representerar en token. <br>
Konstruktorn tar emot två parametrar: 1. Namn 2. Ett reguljärt uttryck.

## Publika Metoder

### `getName ()`
Returnerar tokens namn.

### `getRegularExpression ()`
Returnerar tokens reguljära uttryck.

### Exempel
const numberToken = new Token('NUMBER', /^[0-9]/g) <br>
const floatToken = new Token('FLOAT', /^[0-9]+\.[0-9]+/g) <br>
const addToken = new Token('ADD', /^[+]/g) <br>
const mulToken = new Token('MUL', /^[*]/g) <br>

# TokenMatch
En klass som representerar en token-match. <br>
Konstruktorn tar emot två parametrar: 1. Typ 2. Värde.

## Publika Metoder

### `getType ()`
Returnerar typ av token match.

### `getValue ()`
Returnerar värdet på token match.

### `setType ()`
Ändrar typ av token match.

### `setValue ()`
Ändrar värdet på token match.

## Kör koden
1. Npm install
2. Npm start

## Kör tester
npm test