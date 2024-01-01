function solution(m, n, board) {
  board = board.map((row) => row.split(''));

  while (true) {
    const breakBlockIndex = [];

    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (
          board[i][j] !== '0' &&
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i + 1][j + 1]
        ) {
          breakBlockIndex.push([i, j]);
        }
      }
    }

    if (breakBlockIndex.length === 0) {
      return board.flat().filter((n) => n === '0').length;
    }

    breakBlockIndex.forEach(([i, j]) => {
      board[i][j] = '0';
      board[i][j + 1] = '0';
      board[i + 1][j] = '0';
      board[i + 1][j + 1] = '0';
    });

    for (let j = 0; j < n; j++) {
      let mergedColumn = '';
      for (let i = 0; i < m; i++) {
        mergedColumn += board[i][j];
      }
      const relocatedColumn = mergedColumn.replaceAll('0', '').padStart(m, '0');

      if (relocatedColumn === mergedColumn) continue;

      for (let i = 0; i < m; i++) {
        if (board[i][j] !== relocatedColumn[i]) {
          board[i][j] = relocatedColumn[i];
        }
      }
    }
  }
}
