import { ATTEMPTS } from "./constants.js";
import { makeElementInvisible, makeElementVisible } from "./utils.js";
import Game from "./game.js";

class System {
    #count;

    tries = document.getElementById("tries");
    startText = document.getElementById("startText");
    startButton = document.getElementById("startButton");
    failText = document.getElementById("failText");
    restartButton = document.getElementById("restartButton");
    successText = document.getElementById("successText");
  
    constructor(){
        this.#count = ATTEMPTS;
        this.tries.innerText = this.#count;
        makeElementInvisible(this.startText);
        this.startButton=addEventListener('click', this.#start);
        this.restartButton=addEventListener('click', this.#restart);
    }
    #dCount(){
        this.#count--;
        this.tries.innerText = this.#count;
        if(this.#count <= 10){
            this.tries.style.color = 'red';
        }
    }
    #gameStart = async () =>{
        this.#dCount();
        const result = await new Game();

        if(result){
            makeElementVisible(this.successText)
        } else{
            if(this.#count >0) makeElementVisible(this.failText);
            else makeElementVisible(this.failText);
        }
    };

    #start = ()=>{
        makeElementInvisible(this.startText);
        this.#gameStart();
    };

    #restart = () => {
        makeElementInvisible(this.failText);
        this.#gameStart();
    };

    clean() {
        this.tries.innerText = ATTEMPTS;

        this.startButton.removeEventListener('click',this.#start);
        this.restartButton.removeEventListener('click',this.#restart);
        makeElementInvisible(this.successText);
        makeElementInvisible(this.failText);
    }
}

export default System;