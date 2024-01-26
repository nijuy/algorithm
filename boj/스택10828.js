const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline
  .on('line', function (line) {
    input.push(line.split(' '));
  })
  .on('close', function () {
    solution(input.slice(1));
    process.exit();
  });

function solution(input) {
  const answer = [];
  const array = [];
  let topIndex = -1;

  const stack = {
    push(number) {
      array.push(number);
      topIndex += 1;
    },

    pop() {
      if (topIndex !== -1) {
        topIndex -= 1;
        return array.pop();
      } else {
        return -1;
      }
    },

    size() {
      return topIndex + 1;
    },

    empty() {
      return topIndex === -1 ? 1 : 0;
    },

    top() {
      return topIndex === -1 ? -1 : array[topIndex];
    },
  };

  input.forEach((command) => {
    const [method, arg = undefined] = command;

    if (arg) stack[method](arg);
    else answer.push(stack[method]());
  });

  console.log(answer.join('\n'));
}
