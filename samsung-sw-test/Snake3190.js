const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const APPLE = 'a';
const SNAKE = 's';
const BLANK = '_';

readline
  .on('line', function (line) {
    input.push(line);
  })
  .on('close', function () {
    const n = Number(input[0]);
    const appleCount = Number(input[1]);
    const appleCoord = input.slice(2, 2 + appleCount);
    const turnCount = Number(input[2 + appleCoord.length]);
    const turnInfo = getInfoMap(input.slice(turnCount * -1));

    solution(n, appleCoord, turnInfo);
    process.exit();
  });

function solution(n, appleCoord, turnInfo) {
  let currentDirection = [0, 1];
  let snake = [[0, 0]];
  let time = 0;

  const board = Array.from(Array(n), () => Array(n).fill(BLANK));
  appleCoord.forEach((coord) => {
    const [row, col] = coord.split(' ').map((str) => Number(str) - 1);
    board[row][col] = APPLE;
  });
  board[0][0] = SNAKE;

  while (true) {
    if (turnInfo.has(time)) {
      const turnDir = turnInfo.get(time);
      currentDirection.reverse();

      const flag =
        (turnDir === 'D' && currentDirection[1]) ||
        (turnDir === 'L' && currentDirection[0]);

      if (flag) {
        currentDirection = currentDirection.map((e) => (e *= -1));
      }
    }

    const nextX = snake[0][0] + currentDirection[0];
    const nextY = snake[0][1] + currentDirection[1];

    if (isWall(n, nextX, nextY) || board[nextX][nextY] === SNAKE) break;

    if (board[nextX][nextY] === BLANK) {
      const [tailX, tailY] = snake[snake.length - 1];
      board[tailX][tailY] = BLANK;
      snake.pop();
    }
    board[nextX][nextY] = SNAKE;
    snake.unshift([nextX, nextY]);

    time += 1;
  }

  console.log(time + 1);
}

function isWall(n, x, y) {
  return x === -1 || x === n || y === -1 || y === n;
}

function getInfoMap(arr) {
  return new Map(
    arr.map((info) => {
      const [time, direction] = info.split(' ');
      return [Number(time), direction];
    }),
  );
}
