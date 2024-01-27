const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

readline
  .on('line', function (line) {
    input = line.split(' ').map((char) => Number(char));
  })
  .on('close', function () {
    solution(input);
    process.exit();
  });

function solution(input) {
  let total = input.reduce((prev, current) => prev + current, 0);
  let answer = BigInt(0);

  for (let i = 0; i < input.length - 1; i++) {
    total -= input[i];
    answer += BigInt(input[i] * total);
  }

  console.log(answer.toString());
}
