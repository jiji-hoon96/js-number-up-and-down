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

      
    if (attemptNum === maxAttemptNum) {
      const input = document.getElementById('guess-input');
      const confirmGameBtn = document.getElementById('submit-guess')
      addComputerLog.textContent = `[컴퓨터] : 게임 오버, 정답은 ${correctNum}입니다.`;
      confirmGameBtn.disabled = true;
      input.disabled = true;
      confirmGameBtn.style.backgroundColor = 'grey';
      return;
    }
  
  
    if (inputNum === correctNum) {
      addComputerLog.textContent = "[컴퓨터] : 정답!";
      progressArea.appendChild(addComputerLog);
      showResult();
    } else if (inputNum < correctNum) {

      const addComputerLog1 = document.createElement('li');
      addComputerLog1.textContent = "[컴퓨터] : 업";
      progressArea.appendChild(addComputerLog1);
      addComputerLog1.classList.add('computer-log');

      const addComputerLog2 = document.createElement('li');
      addComputerLog2.textContent = `[컴퓨터] : ${maxAttemptNum -attemptNum}회 남았습니다. 숫자를 맞춰보세요.`;
      progressArea.appendChild(addComputerLog2);
      addComputerLog2.classList.add('computer-log');

    } else {

      const addComputerLog1 = document.createElement('li');
      addComputerLog1.textContent = "[컴퓨터] : 다운";
      progressArea.appendChild(addComputerLog1);
      addComputerLog1.classList.add('computer-log');
      
      const addComputerLog2 = document.createElement('li');
      addComputerLog2.textContent = `[컴퓨터] : ${maxAttemptNum -attemptNum}회 남았습니다. 숫자를 맞춰보세요.`;
      progressArea.appendChild(addComputerLog2);
      addComputerLog2.classList.add('computer-log');

    }
    

    input.value = '';

}

const showResult = () => {
    const progressArea = document.querySelector('.progress-log');
    const input = document.getElementById('guess-input');
    const confirmGameBtn = document.getElementById('submit-guess')
    const resultLog = document.createElement('li');
    resultLog.textContent = `[컴퓨터] : 축하합니다. ${attemptNum}회만에 숫자를 맞추셨습니다.`;
    resultLog.classList.add('computer-log');
    progressArea.appendChild(resultLog);
    confirmGameBtn.disabled = true;
    input.disabled = true;
    confirmGameBtn.style.backgroundColor = 'grey';
  }

const reStart = ()=>{
  window.location.href = 'main.html';
  sessionStorage.clear()
}

const confirmGameBtn = document.getElementById('submit-guess').addEventListener('click', guessNumber);
const reStartBtn = document.getElementById('go-to-main').addEventListener('click',  reStart);