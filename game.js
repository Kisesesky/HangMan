import { ANSWERS, ATTEMPTS, TIME_LIMIT } from "./constants.js";
import { makeElementInvisible, makeElementVisible } from "./utils.js";

class Game {
    constructor() {
        this.attemptsLeft = ATTEMPTS;
        this.timerCount = TIME_LIMIT;
        this.answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
        this.problemWord = this.answer.split('').map(char => char === ' ' ? ' ' : ' _').join('');
        this.stage = 0;
        this.gameOver = false; 

        this.imag = document.querySelectorAll('.body1 > img');
        this.timer = document.getElementById('time');
        this.word = document.getElementById('wordBoard');
        this.answerBoard = document.getElementById('answerBoard');
        this.alphabet = document.querySelectorAll('.buttoncode > button');
        this.tries = document.getElementById('tries');
        this.successText = document.getElementById('successText');
        this.failText = document.getElementById("failText");
        this.restartButton1 = document.getElementById("restartButtonFail");
        this.restartButton2 = document.getElementById("restartButtonSuccess");


        this.word.innerText = this.problemWord;
        this.tries.innerText = this.attemptsLeft;
        this.restartButton1.addEventListener('click', ()=> this.resetGame());
        this.restartButton2.addEventListener('click', ()=> this.resetGame());

    }

    startTimer() {
        this.timerId = setInterval(() => {
            if (this.timerCount <= 0 || this.gameOver) {
                clearInterval(this.timerId);
                if (this.timerCount <= 0) {
                    this.gameOverHandler(false);
                }
                return;
            }
            this.timerCount--;
            this.timer.innerText = this.timerCount;

            if (this.timerCount <= 10) {
                this.timer.style.color = 'red';
            }
        }, 1000);
    }

    handleClickAlphabet(e) {
        const clickedLetter = e.target.innerText.toUpperCase(); 
        e.target.disabled = true;

        if (this.answer.includes(clickedLetter)) {
            this.updateProblemWord(clickedLetter);
            if (this.problemWord === this.answer) {
                this.gameOverHandler(true);
            }
        } else {
            this.attemptsLeft--; 
            this.tries.innerText = this.attemptsLeft;
            if (this.attemptsLeft === 0) {
                this.gameOverHandler(false); 
            } else {
                this.updateHangman();
            }
        }
    }

    updateProblemWord(letter) {
        this.problemWord = this.problemWord.split('').map((char, idx) => {
            return this.answer[idx] === letter ? letter : char;
        }).join('');
        this.word.innerText = this.problemWord;
    }

    updateHangman() {
        if (this.stage < this.imag.length) {
            this.imag[this.stage].classList.remove('invisible');
            this.stage++;
        }
    }

    gameOverHandler(result) {
        if (this.gameOver) return;
        this.gameOver = true;
        clearInterval(this.timerId);
     
        while (this.stage < this.imag.length) {
            this.updateHangman();
        }
     
        if (result) {
            makeElementVisible(this.successText);
            makeElementVisible(this.restartButton2); 
            makeElementInvisible(this.word);
            makeElementInvisible(this.answerBoard);
            makeElementInvisible(this.restartButton1);
        } else {
            makeElementVisible(this.failText);
            makeElementVisible(this.restartButton1); 
            makeElementInvisible(this.word);
            makeElementInvisible(this.answerBoard);
            makeElementInvisible(this.restartButton2);
        }
     
        this.alphabet.forEach(button => button.disabled = true);
     
    

    }
        startGame(){
        if (this.gameOver) return;
        this.startTimer(); 
        this.alphabet.forEach(button => {
            button.addEventListener('click', (e) => this.handleClickAlphabet(e));
        });
    }    
    
    resetGame() {
        if (this.gameOver) {
            this.gameOver = false;
    
            // 타이머 초기화
            clearInterval(this.timerId);  // 기존 타이머 멈추기
            
            // 게임 초기화
            this.attemptsLeft = ATTEMPTS;
            this.timerCount = TIME_LIMIT;
            this.stage = 0;
            this.answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
            this.problemWord = this.answer.split('').map(char => char === ' ' ? ' ' : ' _').join('');  // 문제 단어 초기화
            this.word.innerText = this.problemWord;
            this.tries.innerText = this.attemptsLeft;
    
            // 알파벳 버튼 상태 초기화
            this.alphabet.forEach(button => {
                button.disabled = false;
                button.classList.remove('clicked'); // 클릭된 상태 초기화
            });
    
            this.imag.forEach(img => img.classList.add('invisible'));
    
            this.timer.innerText = this.timerCount;
            this.timer.style.color = 'black';
    
            makeElementInvisible(this.successText);
            makeElementInvisible(this.failText);
            makeElementInvisible(this.restartButton1);
            makeElementInvisible(this.restartButton2);
    
            makeElementInvisible(document.getElementById('startScreen')); 
    
            makeElementVisible(document.getElementById('gameScreen'));
    
            this.startTimer();  
    
            this.startGame();
        }
    }
    
    
   


   
    
}

export default Game;
