import GameLogic from "./domain/gameLogic.js";
import GameView from "./view/gameView.js";
import {rl, singlePrompt,twoNumbersPrompt } from './view/prompt.js';


async function startGame() {
  const [min, max] = await twoNumbersPrompt('게임을 시작하기 위해 최소 값, 최대 값을 입력해주세요. (예: 1,50): ');
  const maxAttempts = await singlePrompt('게임을 시작하기 위해 최대 시도 횟수를 입력해주세요: ');

  const gameLogic = new GameLogic(min, max, maxAttempts);
  const gameView = new GameView(gameLogic);
  await gameView.playGame();

  const restart = await singlePrompt('게임을 다시 시작하시겠습니까? (yes/no): ');
  if (restart === 'yes') {
    startGame();
  } else {
    console.log('게임을 종료합니다.');
    rl.close();
  }
}

startGame();
