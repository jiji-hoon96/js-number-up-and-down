export default function game() {
  return `
  <div class="header">
  <h1>숫자 업&다운 Game</h1>
</div>
<div class="game-input">
  <label for="guess-input">숫자 입력</label>
  <input type="number" min="0" id="guess-input">
  <button id="submit-guess">확인</button>
</div>
<div class="game-progress">
  <h2>진행 화면</h2>
  <ul class="progress-log">
  </ul>
</div>
<button id="go-to-result">결과 화면으로 이동</button>
  `;
}
