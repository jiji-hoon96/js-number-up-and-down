import {inputSingleNumber} from './input.js'

class GameView {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
  }

  async playGame() {
    console.log(`[게임 설정] 게임 시작을 위해 ${this.gameLogic.min}부터 ${this.gameLogic.max} 사이의 숫자를 맞춰보세요. 최대 ${this.gameLogic.maxAttempts}번의 기회가 있습니다.`);

    while (!this.gameLogic.isGameOver()) {
      this.gameLogic.increaseAttempts();

      const input = await inputSingleNumber('숫자 입력: ');
      const guess = parseInt(input, 10);

      if (isNaN(guess) || guess < this.gameLogic.min || guess > this.gameLogic.max) {
        console.log(`${this.gameLogic.min}부터 ${this.gameLogic.max} 사이의 숫자를 입력해주세요.`);
        continue;
      }

      const correct = this.gameLogic.processGuess(guess);
      if (correct) {
        console.log(`정답! 축하합니다! ${this.gameLogic.attempts}번 만에 숫자를 맞추셨습니다.`);
        console.log(`정답은 ${this.gameLogic.answer} 입니다.`)
        break;
      }

    }
  }
}

export default GameView
