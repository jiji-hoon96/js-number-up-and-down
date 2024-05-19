import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function askRestart() {
    rl.question('게임을 재시작하시겠습니까? (yes/no): ', (input) => {
      if (input.toString() === 'yes') {
        playGame();
      } else {
        console.log("게임을 종료합니다.");
        rl.close();
      }
    });
  }

function playGame() {
  const answer = getRandomNumber(1, 50);
  const maxAttempts = 5;
  let attempts = 0;
  let previousGuesses = [];

  console.log("숫자 업앤다운 게임에 오신 것을 환영합니다!");
  console.log("1부터 50 사이의 숫자를 맞춰보세요. 최대 5번의 기회가 있습니다.");

  function askGuess() {
    rl.question('숫자를 입력하세요: ', (input) => {
      const guess = parseInt(input, 10);
      attempts++;

      if (isNaN(guess) || guess < 1 || guess > 50) {
        console.log("1부터 50 사이의 숫자를 입력해주세요.");
      } else {
        previousGuesses.push(guess);

        if (guess < answer) {
          console.log("업");
        } else if (guess > answer) {
          console.log("다운");
        } else {
          console.log("정답!");
          console.log(`총 ${attempts}번 만에 맞췄습니다.`);
          return askRestart();
        }

        console.log(`이전 추측: ${previousGuesses.join(', ')}`);
      }

      if (attempts < maxAttempts) {
        askGuess();
      } else {
        console.log(`아쉽습니다. 정답은 ${answer}였습니다.`);
        askRestart();
      }
    });
  }

  askGuess();
}



playGame();
