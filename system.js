import { ATTEMPTS } from "./constants.js";
import { makeElementInvisible, makeElementVisible } from "./utils.js";
import Game from "./game.js";

class System {
    #count;
    game;

    tries = document.getElementById("tries");
    startText = document.getElementById("startText");
    startButton = document.getElementById("startButton");
    startTitle = document.getElementById("starttitle"); 
    successText = document.getElementById("successText");
    failText = document.getElementById("failText");
    restartButton = document.getElementById("restartButton");

    constructor() {
        this.#count = ATTEMPTS;
        this.tries.innerText = this.#count;
        makeElementInvisible(this.startText);
        makeElementInvisible(this.successText);
        makeElementInvisible(this.failText);
        this.startButton.addEventListener('click', this.#start);
        this.restartButton.addEventListener('click', this.#restart);
    }

    #dCount() {
        if (this.#count > 0) {
            this.#count--;
            this.tries.innerText = this.#count;
        }
    }

    #gameStart = async () => {
        this.#dCount();

        this.game = new Game();
        this.game.startGame();

        const checkGameOver = () => {
            if (this.game.gameOver) {
                if (this.game.problemWord === this.game.answer) {
                    makeElementVisible(this.successText);
                } else {
                    makeElementVisible(this.failText);
                }
            }
        };

        const interval = setInterval(() => {
            checkGameOver();
            if (this.game.gameOver) {
                clearInterval(interval);
            }
        }, 100);
    };

    #start = () => {
        makeElementInvisible(this.startButton);
        makeElementInvisible(this.startTitle);

        this.#gameStart();
    };

    #restart = () => {
        makeElementInvisible(this.failText);
        makeElementInvisible(this.successText);
        this.#count = ATTEMPTS;
        this.tries.innerText = this.#count;

        this.game.resetGame();
        this.#gameStart();
    };

    clean() {
        this.tries.innerText = ATTEMPTS;

        this.startButton.removeEventListener('click', this.#start);
        this.restartButton.removeEventListener('click', this.#restart);
        makeElementInvisible(this.successText);
        makeElementInvisible(this.failText);
    }
}

export default System;
