class GameLogic {
    constructor(min, max, maxAttempts) {
      this.min = min;
      this.max = max;
      this.answer = this.getRandomNumberInRange(min, max);
      this.maxAttempts = maxAttempts;
      this.attempts = 0;
      this.previousGuesses = [];
    }
  
    getRandomNumberInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    processGuess(guess) {
      this.previousGuesses.push(guess);
      if (guess === this.answer) {
        return true;
      }
  
      guess < this.answer ? console.log('업') : console.log('다운');
      console.log(`이전 추측: ${this.previousGuesses.join(', ')}`);
      return false;
    }
  
    isGameOver() {
      if(this.attempts >= this.maxAttempts){
        console.log(`아쉽습니다. 정답은 ${this.answer} 였습니다.`)
        return this.attempts >= this.maxAttempts;
      }
    }
  }
  
  export default GameLogic
  