import Game from "./game.js";

window.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const restartButtons = document.querySelectorAll(".restart");
    const startText = document.getElementById("startText");
    const successText = document.getElementById("successText");
    const failText = document.getElementById("failText");
    const border = document.querySelector(".border");
    let currentGame = null;

    startButton.addEventListener("click", () => {
        startText.style.display = 'none'; 
        border.style.display = 'none'; 
        currentGame = new Game();
        currentGame.startGame();
    });

    restartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentGame.resetGame();
            currentGame.startGame();
            border.style.display = 'block';
        });
    });
});
