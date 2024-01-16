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
    const [n, m, x, y] = input[0].split(' ').map((str) => Number(str));
    const boardNumber = input.slice(1, 1 + n);
    const command = input[1 + n].split(' ').map((str) => Number(str));

    solution(n, m, x, y, boardNumber, command);
    process.exit();
  });

function solution(n, m, x, y, boardNumber, command) {
  const dice = new Map();
  const diceSide = ['top', 'bottom', 'front', 'back', 'left', 'right'];
  const board = [];

  const [동, 서, 북, 남] = [1, 2, 3, 4];
  const direction = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  diceSide.forEach((side) => dice.set(side, 0)); // "가장 처음에 주사위에는 모든 면에 0이 적혀져 있다."

  boardNumber.forEach((row) => {
    board.push(row.split(' ').map((str) => Number(str)));
  });

  let diceCoord = [x, y];
  let positions = [];
  command.forEach((c) => {
    const [nextX, nextY] = diceCoord.map((coord, index) => {
      return coord + direction[c - 1][index];
    });

    if (nextX < 0 || nextX >= n || nextY < 0 || nextY >= m) return; // "만약 바깥으로 이동시키려고 하는 경우에는 해당 명령을 무시해야 하며"

    const [top, bottom, front, back, left, right] = Array.from(dice.values());
    switch (c) {
      case 동:
        positions = [left, right, front, back, bottom, top];
        break;

      case 서:
        positions = [right, left, front, back, top, bottom];
        break;

      case 남:
        positions = [back, front, top, bottom, left, right];
        break;

      case 북:
        positions = [front, back, bottom, top, left, right];
        break;
    }
    diceSide.forEach((side, index) => dice.set(side, positions[index]));

    if (board[nextX][nextY]) {
      dice.set('bottom', board[nextX][nextY]);
      board[nextX][nextY] = 0;
    } else {
      board[nextX][nextY] = dice.get('bottom');
    }

    console.log(dice.get('top'));
    diceCoord = [nextX, nextY];
  });
}

/**
 * 주사위 숫자 갱신
 * 1. positions 배열에 숫자를 넣을 때 diceSide와 동일한 순서로 넣음
 * 2. dice 맵의 값을 갱신 / key (diceSide 배열의 값) - value (positions 배열의 값)
 *
 * 예) 동쪽으로 주사위를 굴릴 때
 * positions [ left,  right,    front,   back,   bottom, top]
 * diceSide  ['top', 'bottom', 'front', 'back', 'left', 'right']
 *
 * ➡ dice.set('top', left)에 의해 left에 있던 숫자가 top으로 이동함
 */
