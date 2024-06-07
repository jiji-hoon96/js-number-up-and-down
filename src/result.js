export default function result() {
  const computerScore = sessionStorage.getItem("computerScore") || "0";
  const userScore = sessionStorage.getItem("userScore") || "0";
  return `
    <div class="header">
        <h1>숫자 업&다운 Game</h1>
    </div>
    <div class="result">
        <h2>게임 결과</h2>
        <p id="result-computer">컴퓨터 : ${computerScore}</p>
        <p id="result-user">사용자 : ${userScore}</p>
    </div>
    <button id="go-to-main">메인 화면으로 이동</button>
    `;
}
