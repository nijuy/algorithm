const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on('line', function (line) {
    input.push(line);
  })
  .on('close', function () {
    solution(input[0], input[1]);
    process.exit();
  });

function solution(origin, explosion) {
  const removeLength = explosion.length - 1;
  const array = [];
  const stack = {
    push(number) {
      array.push(number);
    },

    chunk(length) {
      return array.slice(-length).join('');
    },

    removeChunk(length) {
      array.splice(-length);
    },
  };

  origin.split('').forEach((char, index) => {
    if (index < removeLength) {
      stack.push(char);
    } else {
      if (explosion.length === 1) {
        if (char === explosion) return;
        stack.push(char);
      } else {
        const isMatched = stack.chunk(removeLength) + char === explosion;

        if (isMatched) stack.removeChunk(removeLength);
        else stack.push(char);
      }
    }
  });

  if (array.length === 0) console.log('FRULA');
  else console.log(array.join(''));
}
