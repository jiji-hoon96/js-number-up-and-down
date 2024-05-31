

const guessNumber = () =>{
    const input = document.getElementById('guess-input')
    const inputNum = Number(input.value);
    const processArea = document.querySelector('.progress-log');
    const addUserLog = document.createElement('li');
    addUserLog.textContent = `[유저] : ${inputNum}`;
    addUserLog.classList.add('user-log');
    processArea.appendChild(addUserLog);
    input.value='';
}

const confirmGameBtn = document.getElementById('submit-guess').addEventListener('click', guessNumber);