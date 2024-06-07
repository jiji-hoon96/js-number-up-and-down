export default function home() {
  return `
        <div class="header">
        <h1>숫자 업&다운 Game</h1>
    </div>
    <div class="game-settings">
        <h2>게임 설정</h2>
        <div class="range-inputs">
            <label for="min-number">숫자 범위</label>
            <div class="input-group">
                <input type="number" id="min-number" placeholder="최소" min="0">
                <span> ~ </span>
                <input type="number" id="max-number" placeholder="최대">
            </div>
        </div>
        <div class="attempts-input">
            <label for="attempts">진행 가능 횟수</label>
            <input type="number" min="0" id="attempts">
        </div>
        <button id="start-game">시작하기</button>
    </div>
    </>
    `;
}
