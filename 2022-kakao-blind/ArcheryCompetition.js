function solution(n, info) {
  const candidates = [];

  for (let i = 0; i < 1024; i++) {
    const binaryString = i.toString(2).padStart(10, '0');
    const binaryArray = Array.from(binaryString, Number);

    const ryanInfo = binaryArray.map((isShot, index) => {
      if (isShot) return info[index] + 1;
      else return 0;
    });
    const totalShot = ryanInfo.reduce((acc, arrow) => acc + arrow, 0);

    if (totalShot <= n) {
      ryanInfo[10] = n - totalShot;
      candidates.push(ryanInfo);
    }
  }

  let diff = undefined;
  let answer;

  candidates.forEach((ryanInfo) => {
    const currentDiff = getScoreDiff(info, ryanInfo);

    if (diff === undefined) {
      diff = currentDiff;
      answer = ryanInfo;
    } else if (diff === currentDiff) {
      answer = getMoreArrowAtLower(answer, ryanInfo);
    } else if (currentDiff > diff) {
      diff = currentDiff;
      answer = ryanInfo;
    }
  });

  if (diff <= 0) return [-1];
  return answer;
}

function getScoreDiff(info, ryanInfo) {
  let apeachScore = 0;
  let ryanScore = 0;

  info.forEach((apeachBow, index) => {
    const ryanBow = ryanInfo[index];

    if (apeachBow === 0 && ryanBow === 0) return;
    else if (ryanBow > apeachBow) ryanScore += 10 - index;
    else apeachScore += 10 - index;
  });

  return ryanScore - apeachScore;
}

function getMoreArrowAtLower(a, b) {
  for (let i = 10; i >= 0; i--) {
    if (a[i] === b[i]) continue;
    else if (a[i] > b[i]) return a;
    else if (a[i] < b[i]) return b;
  }
  return a;
}

// ============= 테스트용 코드 (답안엔 없음) =============
const n = 1;
const info = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const result = [0, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0];

console.log(solution(n, info));
