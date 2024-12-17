import { ANSWERS, TIME_LIMIT } from "./constants.js";
import { makeElementInvisible, makeElementVisible } from "./utils.js";

class Game {
  #timerCount;
  #timerId;

  #currentStage;
  #answer;
  #problemText;

  hangmanElements = document.querySelectorAll(".canvas > img");
  timerElement = document.getElementById("timer");
  problemTextElement = document.getElementById("problemText");
  answerTextElement = document.getElementById("answerText");
  alphabetButtonElements = document.querySelectorAll(".alphabets > button");
  alphabetEventListeners = [];

  constructor() {
    this.#timerCount = TIME_LIMIT;
    this.#currentStage = 0;
    this.#answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    console.log(this.#answer);
    this.#problemText = this.#answer
      .split("")
      .reduce((acc, cur) => (cur === " " ? acc + " " : acc + "_"), "");

    this.timerElement.innerText = this.#timerCount;
    this.problemTextElement.innerText = this.#problemText;
    makeElementVisible(this.problemTextElement);
    this.answerTextElement.innerText = `정답: ${this.#answer}`;
    makeElementInvisible(this.answerTextElement);

    return new Promise((resolve) => {
      this.#timerId = setInterval(() => {
        if (this.#timerCount <= 0)resolve(false);
        else this.#decreaseTimerCount();
      }, 1000);

      this.alphabetButtonElements.forEach((element) => {
        const onClick = () => {
          this.#clickAlphabet(element, resolve);
          element.removeEventListener("click", onClick);
        };
        this.alphabetEventListeners.push(onClick);
        element.addEventListener("click", onClick);
      });
    }).then(this.#gameOver);
  }

  #clickAlphabet = (element, resolve) => {
    element.classList.add("button-invisible");
    element.removeEventListener("click", () =>
      this.#clickAlphabet(element, resolve)
    );

    if (this.#answer.includes(element.innerText)) {
      this.#updateProblemText(element.innerText);
      if (this.#problemText === this.#answer) resolve(true);
    } else {
      if (this.#currentStage < this.hangmanElements.length - 1)
        this.#nextStage();
      else resolve(false);
    }
  };

  #decreaseTimerCount() {
    this.#timerCount--;
    this.timerElement.innerText = this.#timerCount;
  }

  #nextStage() {
    this.#currentStage++;
    Array.from(this.hangmanElements)
      .slice(0, this.#currentStage)
      .forEach((element) => element.classList.remove("invisible"));
  }

  #updateProblemText(newAlphabet) {
    this.#problemText = this.#problemText
      .split("")
      .reduce((acc, cur, index) => {
        if (cur === " " || cur !== "_") return acc + cur;
        if (this.#answer[index] === newAlphabet) return acc + newAlphabet;
        else return acc + "_";
      }, "");
    this.problemTextElement.innerText = this.#problemText;
  }

  #gameOver = (result) => {
    clearInterval(this.#timerId);

    makeElementVisible(this.answerTextElement);

    this.hangmanElements.forEach((element) =>
      element.classList.add("invisible")
    );
    makeElementInvisible(this.problemTextElement);
    this.alphabetButtonElements.forEach((element, index) => {
      element.classList.remove("button-invisible");
      element.removeEventListener("click", this.alphabetEventListeners[index]);
    });

    return result;
  };
}

export default Game;
