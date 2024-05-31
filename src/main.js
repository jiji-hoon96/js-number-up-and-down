

const playGame = () => {
    const minNum = Number(document.getElementById('min-number').value);
    const maxNum = Number(document.getElementById('max-number').value);
    const maxAttemptNum = Number(document.getElementById('attempts').value);

    if(minNum === '' || maxNum === '' || maxAttemptNum === ''){
        return alert('모든 값을 입력해주세요.');    
    }

    if(maxAttemptNum <= 0){
        return alert('게임 진행 가능 횟수는 최소 1번 이상입니다.');
    }

    if(minNum >= maxNum){
        return alert('최소값은 최대값보다 작아야 합니다.');
    }
    sessionStorage.setItem('minNum', minNum);
    sessionStorage.setItem('maxNum', maxNum);
    sessionStorage.setItem('maxAttemptNum', maxAttemptNum);
    window.location.href="game.html"
  }   

const startGameBtn = document.getElementById('start-game').addEventListener('click', playGame);
