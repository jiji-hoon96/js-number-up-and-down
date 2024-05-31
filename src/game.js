let attemptNum=0;
const minNum = Number(sessionStorage.getItem('minNum'));
const maxNum = Number(sessionStorage.getItem('maxNum'));
const maxAttemptNum = Number(sessionStorage.getItem('maxAttemptNum'));
let correctNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;


const guessNumber = () =>{
    const input = document.getElementById('guess-input');
    const inputNum = Number(input.value);
    const progressArea = document.querySelector('.progress-log');
    const addUserLog = document.createElement('li');
    const addComputerLog = document.createElement('li');
    addUserLog.textContent = `[유저] : ${inputNum}`;
    addUserLog.classList.add('user-log');
    addComputerLog.classList.add('computer-log');
    progressArea.appendChild(addUserLog);
    progressArea.appendChild(addComputerLog);
  
    attemptNum++;
  
    if (inputNum === correctNum) {
      addComputerLog.textContent = `[컴퓨터] : ${correctNum}`;
      showResult();
    } else if (inputNum < correctNum) {
      addComputerLog.textContent = "[컴퓨터] : 업";
    } else {
      addComputerLog.textContent = "[컴퓨터] : 다운";
    }
  
    if (attemptNum === maxAttemptNum && inputNum !== correctNum) {
      addComputerLog.textContent = `[컴퓨터] : 게임 오버, 정답은 ${correctNum}` ;
      showResult();
    }
  
    input.value = '';
}

const showResult = () => {
    const progressArea = document.querySelector('.progress-log');
    const resultLog = document.createElement('li');
    resultLog.textContent = `[컴퓨터] : ${attemptNum}회 만에 맞췄습니다.`;
    resultLog.classList.add('computer-log');
    progressArea.appendChild(resultLog);
    
  }
  
  const restartGame = () => {
    location.reload();
  }
  
  const quitGame = () => {
    window.close();
  }

const reStart = ()=>{
  window.location.href = 'main.html';
  sessionStorage.clear()
}

const confirmGameBtn = document.getElementById('submit-guess').addEventListener('click', guessNumber);
const reStartBtn = document.getElementById('go-to-main').addEventListener('click',  reStart);