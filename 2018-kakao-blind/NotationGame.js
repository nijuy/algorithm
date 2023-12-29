function solution(n, t, m, p) {
  var answer = '';

  let allNumber = '';
  for (let i = 0; i < t * m; i++) {
    allNumber += i.toString(n).toUpperCase();
  }

  for (let i = p - 1; i < t * m; i += m) {
    answer += allNumber[i];
  }

  return answer;
}
