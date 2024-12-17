import { ATTEMPTS } from "./constants.js";
import { makeElementInvisible, makeElementVisible } from "./utils.js";
import Game from "./game.js";

class System {
  #count;

  triesElement = document.getElementById("tries");
  startTextElement = document.getElementById("startText");
  startButtonElement = document.getElementById("startButton");
  failTextElement = document.getElementById("failText");
  restartButtonElement = document.getElementById("restartButton");
  successTextElement = document.getElementById("successText");
  overTextElement = document.getElementById("overText");

  constructor() {
    this.#count = ATTEMPTS;

    this.triesElement.innerText = this.#count;
    makeElementVisible(this.startTextElement);
    this.startButtonElement.addEventListener("click", this.#start);
    this.restartButtonElement.addEventListener("click", this.#restart);
  }

  #decreaseCount() {
    this.#count--;
    this.triesElement.innerText = this.#count;
  }

  #gameStart = async () => {
    this.#decreaseCount();
    const result = await new Game();

    if (result) {
      makeElementVisible(this.successTextElement);
    } else {
      if (this.#count > 0) makeElementVisible(this.failTextElement);
      else makeElementVisible(this.overTextElement);
    }
  };

  #start = () => {
    makeElementInvisible(this.startTextElement);
    this.#gameStart();
  };

  #restart = () => {
    makeElementInvisible(this.failTextElement);
    this.#gameStart();
  };

  cleanup() {
    this.triesElement.innerText = ATTEMPTS;

    this.startButtonElement.removeEventListener("click", this.#start);
    this.restartButtonElement.removeEventListener("click", this.#restart);
    makeElementInvisible(this.successTextElement);
    makeElementInvisible(this.overTextElement);
  }
}

export default System;
