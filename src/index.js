import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const askRestart = async () => {
  const input = await prompt('게임을 다시 시작하시겠습니까? (yes/no) : ');
  if (input.toString() === 'yes') {
    return playGame();
  } 
  console.log('게임을 종료합니다.');
  rl.close(); 
};

const processGuess = (guess, answer, attempts, previousGuesses) => {
  previousGuesses.push(guess);
  if (guess === answer) {
    console.log('정답!');
    console.log(`축하합니다! ${attempts}번 만에 숫자를 맞추셨습니다.`);
    return true;
  }

  if (guess < answer) {
    console.log('업');
  } else {
    console.log('다운');
  }

  console.log(`이전 추측: ${previousGuesses.join(', ')}`);
  return false;
};

const askGuess = async (answer, attempts, previousGuesses, maxAttempts) => {
  const input = await prompt('숫자 입력: ');
  const guess = parseInt(input, 10);

  if (isNaN(guess) || guess < 1 || guess > 50) {
    console.log('1부터 50 사이의 숫자를 입력해주세요.');
    return false;
  }

  const correct = processGuess(guess, answer, attempts, previousGuesses);
  return correct;
};

const playGame = async () => {
  const answer = getRandomNumber(1, 50);
  const maxAttempts = 5;
  let attempts = 0;
  const previousGuesses = [];

  console.log('숫자 업앤다운 게임에 오신 것을 환영합니다!');
  console.log('1부터 50 사이의 숫자를 맞춰보세요. 최대 5번의 기회가 있습니다.');

  while (attempts < maxAttempts) {
    attempts += 1;
    const correct = await askGuess(answer, attempts, previousGuesses, maxAttempts);
    if (correct) {
      return askRestart();
    }
  }

  console.log(`아쉽습니다. 정답은 ${answer}였습니다.`);
  askRestart();
};

playGame();
