import createRouter from "./router.js";
import home from "./home.js";
import game from "./game.js";
import { getNumberInputValue } from "./utils.js";

let correctNum;
let attemptNum = 0;

const router = createRouter();

const alertAndReturn = (message) => {
  alert(message);
  return;
};

const createLogElement = (text, className) => {
  const logElement = document.createElement("li");
  logElement.textContent = text;
  logElement.classList.add(className);
  return logElement;
};

const appendLogElements = (elements) => {
  const progressArea = document.querySelector(".progress-log");
  elements.forEach((element) => progressArea.appendChild(element));
};

const disableFeature = () => {
  const confirmGameBtn = document.getElementById("submit-guess");
  confirmGameBtn.disabled = true;
  document.getElementById("guess-input").disabled = true;
  confirmGameBtn.style.backgroundColor = "grey";
};

const showResult = () => {
  const resultLog = document.createElement("li");
  resultLog.textContent = `[컴퓨터] 축하합니다! 정답을 ${attemptNum}회만에 숫자를 맞추셨습니다. 정답은 ${correctNum}입니다!`;
  resultLog.classList.add("computer-log");
  document.querySelector(".progress-log").appendChild(resultLog);
  disableFeature();
};

const playGame = () => {
  const minNum = getNumberInputValue("min-number");
  const maxNum = getNumberInputValue("max-number");
  const maxAttemptNum = getNumberInputValue("attempts");

  if (!minNum || !maxNum || !maxAttemptNum)
    return alertAndReturn("모든 값을 입력해주세요.");
  if (maxAttemptNum <= 0)
    return alertAndReturn("게임 진행 가능 횟수는 최소 1번 이상입니다.");
  if (minNum >= maxNum)
    return alertAndReturn("최소값은 최대값보다 작아야 합니다.");

  sessionStorage.setItem("minNum", minNum);
  sessionStorage.setItem("maxNum", maxNum);
  sessionStorage.setItem("maxAttemptNum", maxAttemptNum);

  correctNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

  router.navigate("#/game");
};

const guessNumber = () => {
  const inputNum = Number(document.getElementById("guess-input").value);
  const maxAttemptNum = Number(sessionStorage.getItem("maxAttemptNum"));
  const userLog = createLogElement(`[유저] : ${inputNum}`, "user-log");
  let computerLog;
  document.getElementById("guess-input").value = "";
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

const goToHome = () => {
  router.navigate("");
  attemptNum = 0;
};

const container = document.querySelector(".container");
const pages = {
  home: () => {
    container.innerHTML = home();
    document.getElementById("start-game").addEventListener("click", playGame);
  },
  game: () => {
    container.innerHTML = game();
    const confirmGameBtn = document.getElementById("submit-guess");
    const goToMainBtn = document.getElementById("go-to-main");

    confirmGameBtn.addEventListener("click", guessNumber);
    goToMainBtn.addEventListener("click", goToHome);
  },
};

router.addRouter("", pages.home).addRouter("#/game", pages.game).start();
