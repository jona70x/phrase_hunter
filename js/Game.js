"use strict";

class Game {
  constructor() {
    //Keeps track of incorrect choices
    this.missed = 0;
    //Phrases to play
    this.phrases = [
      new Phrase("As father as son"),
      new Phrase("Spill the beans"),
      new Phrase("Break a leg"),
      new Phrase("Make a long story short"),
      new Phrase("Break the ice"),
    ];
    //When the game starts, the active phrase becomes the phrase object returned by the startGame method.
    this.activePhrase = null;
  }

  /**
   * Gets random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  /**
   * Starts game by selecting and phrase and displaying it to the user
   */
  startGame() {
    //Hidding overlay
    document.querySelector("#overlay").style.display = "none";
    //Calling and storing the random phrase
    const phrase = this.getRandomPhrase();
    phrase.addPhraseToDisplay();
    //Setting active phrase
    this.activePhrase = phrase;
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (htmlElement) button - The clicked button element
   */
  handleInteraction(htmlElement) {
    const bntText = htmlElement.textContent;

    //Calling check letter method
    if (this.activePhrase.checkLetter(bntText)) {
      htmlElement.classList.add("chosen");
      htmlElement.setAttribute("disabled", true);
      this.activePhrase.showMatchedLetter(bntText);
      this.checkForWin();

      if (this.checkForWin()) {
        this.gameOver(true);
        this.reset();
      }
    } else {
      htmlElement.classList.add("wrong");
      htmlElement.setAttribute("disabled", true);
      this.removeLife();
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    //Selecting hearts elements
    const gameLives = document.querySelectorAll(".tries");

    //Iterating over lives nodes list, if condition is met, will remove className and replace live image
    for (let i = 0; i < gameLives.length; i++) {
      if (gameLives[i].classList.contains("tries")) {
        gameLives[i].classList.remove("tries");
        gameLives[i].classList.add("empty");
        gameLives[i].firstElementChild.src = "images/lostHeart.png";
      }
      break;
    }
    this.missed++;
    if (this.missed === 5) {
      this.gameOver(false);
      this.reset();
    }
  }
  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    const hiddenLetters = document.querySelectorAll(".letter");

    const checkForWin = [...hiddenLetters].every((letterEl) =>
      letterEl.classList.contains("show")
    );
    return checkForWin;
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    const overlay = document.querySelector("#overlay");
    const gameOverMessage = document.querySelector("#game-over-message");

    if (gameWon) {
      overlay.style.display = "flex";
      overlay.firstElementChild.textContent = "Phrase Hunter 🎯";
      overlay.classList.replace("start", "win");
      if (overlay.classList.contains("lose"))
        overlay.classList.replace("lose", "win");
      gameOverMessage.textContent = `Congratulations!🥳 
      You guessed: '${
        this.activePhrase.phrase[0].toUpperCase() +
        this.activePhrase.phrase.slice(1)
      }'. 
      Do you want to try again?👇🏻`;
    } else {
      overlay.style.display = "flex";
      overlay.firstElementChild.textContent = "Phrase Hunter 🎯";
      overlay.classList.replace("start", "lose");
      if (overlay.classList.contains("win"))
        overlay.classList.replace("win", "lose");
      gameOverMessage.textContent =
        "You lost the game 😢. Do you want try again?👇🏻";
    }
  }

  /**
   *resets all changes in elements.
   */
  reset() {
    document.querySelector("#phrase ul").innerHTML = "";
    document.querySelectorAll(".key").forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.classList.remove("chosen");
      btn.classList.remove("wrong");
    });
    document.querySelectorAll(".empty").forEach((live) => {
      live.classList.add("tries");
      live.firstElementChild.src = "images/liveHeart.png";
    });
    this.missed = 0;
  }
}
