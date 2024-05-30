class GameLogic {
  #min;
  #max;
  #answer;
  #attempts;
  #maxAttempts;
  #previousGuesses;

  constructor(min, max, maxAttempts) {
    this.#min = min;
    this.#max = max;
    this.#maxAttempts = maxAttempts;
    this.#attempts = 0;
    this.#previousGuesses = [];
    this.#answer = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  get min() {
    return this.#min;
  }

  get max() {
    return this.#max;
  }

  get attempts() {
    return this.#attempts;
  }

  get maxAttempts() {
    return this.#maxAttempts;
  }

  get answer() {
    return this.#answer;
  }

  processGuess(guess) {
    this.#previousGuesses.push(guess);

    if (guess === this.#answer) {
      return true;
    }
    guess < this.answer ? console.log('업') : console.log('다운');
    console.log(`이전 추측: ${this.#previousGuesses.join(', ')}`);

    return false;
  }

  increaseAttempts() {
    this.#attempts += 1;
  }

  isGameOver() {
    if (this.#attempts >= this.#maxAttempts) {
      console.log(`아쉽습니다. 정답은 ${this.answer} 였습니다.`)

      return false;
    }
  }
}

export default GameLogic;