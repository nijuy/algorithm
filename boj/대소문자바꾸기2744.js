const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

readline
  .on('line', function (line) {
    input = line;
  })
  .on('close', function () {
    solution(input);
    process.exit();
  });

function solution(input) {
  const answer = [];
  input.split('').forEach((char) => {
    if (char.charCodeAt() >= 97) {
      answer.push(char.toUpperCase());
    } else {
      answer.push(char.toLowerCase());
    }
  });

  console.log(answer.join(''));
}
