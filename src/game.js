const minNum = Number(sessionStorage.getItem('minNum'));
const maxNum = Number(sessionStorage.getItem('maxNum'));
const maxAttemptNum = Number(sessionStorage.getItem('maxAttemptNum'));
let correctNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
let attemptNum = 0;

const createLogElement = (text, className) => {
  const logElement = document.createElement('li');
  logElement.textContent = text;
  logElement.classList.add(className);
  return logElement;
};

const appendLogElements = (elements) => {
  const progressArea = document.querySelector('.progress-log');
  elements.forEach(element => progressArea.appendChild(element));
};

const guessNumber = () => {
  const input = document.getElementById('guess-input');
  const inputNum = Number(input.value);
  const userLog = createLogElement(`[유저] : ${inputNum}`, 'user-log');
  let computerLog;

  attemptNum++;

  if (attemptNum === maxAttemptNum) {
    const confirmGameBtn = document.getElementById('submit-guess');
    computerLog = createLogElement(`[컴퓨터] : 게임 오버, 정답은 ${correctNum}입니다.`, 'computer-log');
    confirmGameBtn.disabled = true;
    input.disabled = true;
    confirmGameBtn.style.backgroundColor = 'grey';
    appendLogElements([userLog, computerLog]);
    return;
  }

  if (inputNum === correctNum) {
    computerLog = createLogElement("[컴퓨터] : 정답!", 'computer-log');
    appendLogElements([userLog, computerLog]);
    showResult();
    return;
  }

  computerLog = createLogElement(inputNum < correctNum ? "[컴퓨터] : 업" : "[컴퓨터] : 다운", 'computer-log');
  appendLogElements([userLog, computerLog]);
};

document.getElementById('start-game').addEventListener('click', guessNumber);