"use strict";
//Selecting elements
const game = new Game();
const startBtn = document.querySelector("#btn__reset");
const phraseContainer = document.querySelector("#phrase");
const qwertyKeyboard = document.querySelector("#qwerty");

/**
 *Listening for click event to start game
 */
startBtn.addEventListener("click", function (e) {
  game.startGame();
});

qwertyKeyboard.addEventListener("click", function (e) {
  const targetBtn = e.target;

  //Makes sure that click action only happens in key buttons
  if (targetBtn.classList.contains("key")) {
    game.handleInteraction(targetBtn);
  }
});

/**
 * Adding a istener that allows playing the game with keyboard
 */
document.addEventListener("keydown", function (e) {
  //Checks key pressed
  const keyPressed = e.key;
  //contains all buttons in keyboard element
  const btnsQwerty = [...document.querySelectorAll(".key")];
  //If the key pressed is in keyboard element, will return the key
  const targetBtn = btnsQwerty.find((btn) => btn.textContent === keyPressed);

  //Guard clauses
  //If button doesn't exist or is null, exit the function
  if (targetBtn === undefined || targetBtn === null) return;
  //If the game ended either for win or loss, keyboard doesn't have any effect
  if (game.checkForWin() || game.missed === 5) return;
  //If we already pressed the key, keyboard won't listen for the event
  if (
    targetBtn.classList.contains("wrong") ||
    targetBtn.classList.contains("chosen")
  )
    return;
  //Calling handle interaction with btn element
  game.handleInteraction(targetBtn);
});
