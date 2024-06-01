const getNumberInputValue = (id) => Number(document.getElementById(id).value);

const alertAndReturn = (message) => {
  alert(message);
  return;
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
  window.location.href = "game";
};

document.getElementById("start-game").addEventListener("click", playGame);
