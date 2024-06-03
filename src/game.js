const minNum = Number(sessionStorage.getItem("minNum"));
const maxNum = Number(sessionStorage.getItem("maxNum"));
const maxAttemptNum = Number(sessionStorage.getItem("maxAttemptNum"));

const input = document.getElementById("guess-input");
const progressArea = document.querySelector(".progress-log");
const confirmGameBtn = document.getElementById("submit-guess");

let correctNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
let attemptNum = 0;

const createLogElement = (text, className) => {
  const logElement = document.createElement("li");
  logElement.textContent = text;
  logElement.classList.add(className);
  return logElement;
};

const appendLogElements = (elements) => {
  elements.forEach((element) => progressArea.appendChild(element));
};

const disableFeature = () => {
  confirmGameBtn.disabled = true;
  input.disabled = true;
  confirmGameBtn.style.backgroundColor = "grey";
};

const showResult = () => {
  const resultLog = document.createElement("li");
  resultLog.textContent = `[컴퓨터] 축하합니다! 정답을 ${attemptNum}회만에 숫자를 맞추셨습니다. 정답은 ${correctNum}입니다!`;
  resultLog.classList.add("computer-log");
  progressArea.appendChild(resultLog);
  disableFeature();
};

const guessNumber = () => {
  const inputNum = Number(input.value);
  const userLog = createLogElement(`[유저] : ${inputNum}`, "user-log");
  let computerLog;
  input.value = "";
  appendLogElements([userLog]);
  attemptNum++;

  if (inputNum !== correctNum && attemptNum !== maxAttemptNum) {
    computerLog = createLogElement(
      inputNum < correctNum ? "[컴퓨터] : 업" : "[컴퓨터] : 다운",
      "computer-log"
    );
    appendLogElements([userLog, computerLog]);
  }

  if (inputNum === correctNum) {
    showResult();
    return;
  }

  if (attemptNum === maxAttemptNum) {
    computerLog = createLogElement(
      `[컴퓨터] : 게임 오버, 정답은 ${correctNum}입니다.`,
      "computer-log"
    );
    disableFeature();
    appendLogElements([userLog, computerLog]);
    return;
  }
};

const goToM = () => {
  window.location.href = "main";
};

document.getElementById("submit-guess").addEventListener("click", guessNumber);
document.getElementById("go-to-main").addEventListener("click", goToM);
