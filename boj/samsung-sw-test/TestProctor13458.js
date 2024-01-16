const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

readline
  .on('line', function (line) {
    input.push(line);
  })
  .on('close', function () {
    const a = input[1].split(' ').map((str) => Number(str));
    const [b, c] = input[2].split(' ').map((str) => Number(str));

    solution(a, b, c);
    process.exit();
  });

function solution(a, b, c) {
  let answer = 0;

  a.forEach((student) => {
    if (student > b) answer += Math.ceil((student - b) / c);
    answer += 1;
  });

  console.log(answer);
}
