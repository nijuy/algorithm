function solution(id_list, report, k) {
  var answer = [];

  const reportSet = new Set(report); // "한 유저가 같은 유저를 여러 번 신고한 경우는 1회로 처리"를 위해 신고 기록을 집합에 넣음
  const userReportList = {}; // "유저명": [해당 유저가 신고한 유저 리스트]
  const userReportedCount = {}; // "유저명": 해당 유저가 신고 당한 횟수

  for (const id of id_list) {
    userReportList[id] = [];
    userReportedCount[id] = 0;
  }

  for (const r of reportSet) {
    const [reporting, reported] = r.split(' ');

    userReportList[reporting].push(reported);
    userReportedCount[reported] += 1;
  }

  const stopUser = new Set();
  for (const [user, reportedCount] of Object.entries(userReportedCount)) {
    if (reportedCount >= k) stopUser.add(user);
  }

  for (const user in userReportList) {
    let count = userReportList[user].filter((r) => stopUser.has(r)).length;
    answer.push(count);
  }

  return answer;
}
