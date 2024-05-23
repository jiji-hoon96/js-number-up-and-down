import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const singlePrompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const validateInput = (answer) => {
  if (!answer.includes(',')) {
    console.log('양식에 맞게 숫자를 입력해주세요 (예: 1,50)');
    return false;
  }
  const numbers = answer.split(',').map(num => parseInt(num, 10));
  if (numbers.length !== 2 || numbers.some(isNaN)) {
    console.log('숫자 두 개를 정확히 입력해주세요 (예: 1,50)');
    return false;
  }
  return numbers;
};

const twoNumbersPrompt = (query) => new Promise((resolve) => {
  const askQuestion = () => {
    rl.question(query, (answer) => {
      const numbers = validateInput(answer);
      if (numbers) {
        return resolve(numbers);
      }
      askQuestion();
    });
  };
  askQuestion();
});

export {  rl, singlePrompt, twoNumbersPrompt };
