function solution(n, k) {
  var answer = 0;

  const k_digit = n.toString(k);
  const candidates = k_digit.split('0').map((n) => Number(n));

  candidates.forEach((n) => {
    if (n === 0 || n === 1) return;
    else if (isPrimeNumber(Number(n))) {
      answer += 1;
    }
  });

  return answer;
}

function isPrimeNumber(number) {
  let answer = true;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      answer = false;
      break;
    }
  }

  return answer;
}

// ============= 테스트용 코드 (답안엔 없음) =============
const n = 437674;
const k = 3;
console.log(solution(n, k));
