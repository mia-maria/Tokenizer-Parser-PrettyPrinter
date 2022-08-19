/**
 * The my-pretty-printer web component module.
 *
 * @author Mia-Maria Galistel <mg223tj@student.lnu.se>
 * @version 1.0.0
 */

import { Document } from '../parser'

/*
* Define template.
*/
const template = document.createElement('template')
template.innerHTML = `
 <style>
  #submitButton {
    cursor: pointer;
    padding: 8px;
    border-radius: 5px;
    background-color: #3F9615;
    color: white;
    font-weight: bold;
  }
 </style>
 <h2>Pretty Printer</h2>
 <form id="textForm">
  <div>
    <textarea id="text" rows="10" cols="80" placeholder="Write the text here." required="required" autofocus="autofocus"></textarea>
  </div>
  <button type="submit" id="submitButton">Submit</button>
</form>
 <div id="document">
 </div>
 `

/*
  * Define custom element.
  */
customElements.define('my-pretty-printer',
  /**
   * Represents a my-pretty-printer component.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of a my-pretty-printer.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this._document = this.shadowRoot.querySelector('#document')
      this._text = this.shadowRoot.querySelector('#text')
      this._textForm = this.shadowRoot.querySelector('#textForm')
      this._onSubmit = this._onSubmit.bind(this)
    }

    /**
     * Called when the element is placed into the DOM.
     */
    connectedCallback () {
      this._textForm.addEventListener('submit', this._onSubmit)
    }

    /**
     * Invoked when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this._textForm.removeEventListener('submit', this._onSubmit)
    }

    /**
     * Called when the user submits a text.
     *
     * @param {event} event - the submit event.
     */
    _onSubmit (event) {
      event.preventDefault()
      this.printSentences(this._text.value)
      this._text.value = ''
    }

    /**
     * Prints sentence.
     *
     * @param {string} text - the text to parse into sentences.
     * @function
     */
    printSentences (text) {
      this._removePreviousText()
      const documentToParse = new Document(text)
      const sentences = documentToParse.getSentences()
      for (let i = 0; i < sentences.length; i++) {
        const sentence = documentToParse.getOneSentence(i)
        const paragraph = document.createElement('p')
        const paragraphText = document.createTextNode('Index ' + i + ': ' + sentence)
        paragraph.appendChild(paragraphText)
        const sentenceType = documentToParse.getSentenceType(sentences[i])
        this._setParagraphStyle(paragraph, sentenceType)
        this._document.appendChild(paragraph)
      }
    }

    /**
     * Remove the previous printed text if any.
     *
     * @function
     */
    _removePreviousText () {
      while (this._document.firstChild) {
        this._document.removeChild(this._document.firstChild)
      }
    }

    /**
     * Sets the style of the paragraph.
     *
     * @param {paragraph} paragraph - the paragraph to style.
     * @param {string} sentenceType - the type of the sentence.
     * @function
     */
    _setParagraphStyle (paragraph, sentenceType) {
      if (sentenceType === 'DOT') {
        paragraph.style.color = 'green'
      }
      if (sentenceType === 'QUESTIONMARK') {
        paragraph.style.color = 'blue'
      }
      if (sentenceType === 'EXCLAMATIONMARK') {
        paragraph.style.color = 'red'
      }
    }
  }
)
