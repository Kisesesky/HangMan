import System from "./system.js";
import { makeElementInvisible } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  const resetButtonElements = document.getElementsByClassName("reset-button");
  const answerTextElement = document.getElementById("answerText");
  let currentSystem = new System();

  setTimeout(() => {
    const backgroundContainer = document.querySelector('.background-container');
    backgroundContainer.style.opacity = '0';
  }, 1800);

  Array.from(resetButtonElements).forEach((element) => {
    element.addEventListener("click", () => {
      currentSystem.cleanup();
      makeElementInvisible(answerTextElement);
      currentSystem = new System();
    });
  });
});
