const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
readline
  .on('line', function (line) {
    input = parseInt(line);
  })
  .on('close', function () {
    solution(input);
    process.exit();
  });

function solution(input) {
  const array = Array.from({ length: input }, (_, i) => i + 1);
  const answer = [];
  let currentIndex = 0;

  while (true) {
    if (currentIndex === input * 2 - 2) {
      answer.push(array[array.length - 1]);
      break;
    }

    answer.push(array[currentIndex++]);
    array.push(array[currentIndex++]);
  }

  console.log(answer.join(' '));
}
