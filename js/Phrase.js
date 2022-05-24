"use strict";

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on screen
   */
  addPhraseToDisplay() {
    // splitting the phrase to work with each character
    const phraseToDisplay = this.phrase.split("");
    //Stores html
    let html = "";

    phraseToDisplay.forEach((character) => {
      html += `
       <li class="${character === " " ? "space" : "hide letter "}${
        character === " " ? "" : character
      }">${character}</li>
       `;

      return html;
    });

    document.querySelector("#phrase ul").insertAdjacentHTML("beforeend", html);
  }
  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    //returns true if letter is in phrase
    return game.activePhrase.phrase.includes(letter);
  }
  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const letterElements = document.querySelectorAll(`.${letter}`);
    letterElements.forEach((letterEl) => {
      letterEl.classList.remove("hide");
      letterEl.classList.add("show");
    });
  }
}
