import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validateInput = (answer) => {
  if (!answer.includes(',')) {
    console.log('양식에 맞게 숫자를 입력해주세요 (예: 1,50)');
    return false;
  }
  const numbers = answer.split(',').map(num => parseInt(num, 10));
  if (numbers.length !== 2 || numbers.some(isNaN)) {
    console.log('숫자 두 개를 정확히 입력해주세요 (예: 1,50)');
    return false;
  }
  return numbers;
};

const singlePrompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const twoNumbersPrompt = (query) => new Promise((resolve) => {
  const askQuestion = () => {
    rl.question(query, (answer) => {
      const numbers = validateInput(answer);
      if (numbers) {
        return resolve(numbers);
      }
      askQuestion();
    });
  };
  askQuestion();
});

const askRestart = async () => {
  const input = await singlePrompt('게임을 다시 시작하시겠습니까? (yes/no) : ');
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

  guess < answer ? console.log('업') : console.log('다운');
  
  console.log(`이전 추측: ${previousGuesses.join(', ')}`);
  return false;
};

const getTwoRandomNumbersInRange = async () => {
  while (true) {
    const [min, max] = await twoNumbersPrompt('숫자 입력: ');
    if (max - min >= 1) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
      return  [randomNumber, min, max];
    }
    console.log('최소 값과 최대 값을 다시 설정해주세요');
  }
};

const askMaxAttempts = async ()=>{
  const maxAttempts = await singlePrompt('숫자 입력: ');
  if(maxAttempts < 1) {
    console.log("게임 진행 가능 횟수는 최소 2번 이상입니다.")
    return false;
  }
  return maxAttempts
}

const askGuess = async (answer, attempts, previousGuesses, min, max) => {
  const input = await singlePrompt('숫자 입력: ');
  const guess = parseInt(input, 10);

  if (isNaN(guess) || guess < min || guess > max) {
    console.log(`${min}부터 ${max} 사이의 숫자를 입력해주세요.`);
    return false;
  }

  const correct = processGuess(guess, answer, attempts, previousGuesses);
  return correct;
};

const playGame = async () => {
  console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)");

  const [randomNumber,min,max] = await getTwoRandomNumbersInRange()

  console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.")

  const maxAttempts = await askMaxAttempts();
  let attempts = 0;
  const previousGuesses = [];

  console.log('숫자 업앤다운 게임에 오신 것을 환영합니다!');
  console.log(`${min}부터 ${max} 사이의 숫자를 맞춰보세요. 최대 ${maxAttempts}번의 기회가 있습니다.`);

  while (attempts < maxAttempts) {
    attempts += 1;
    const correct = await askGuess(randomNumber, attempts, previousGuesses, min, max);
    if (correct) {
      return askRestart();
    }
  }

  console.log(`아쉽습니다. 정답은 ${randomNumber} 였습니다.`);
  askRestart();
};

playGame();