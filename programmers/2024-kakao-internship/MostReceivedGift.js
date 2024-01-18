function solution(friends, gifts) {
  var answer = 0;
  gifts = gifts.map((gift) => gift.split(' '));
  const giftMap = new Map();

  friends.forEach((name) => {
    const give = gifts
      .filter((gift) => gift[0] === name)
      .map((record) => record[1]);

    const take = gifts
      .filter((gift) => gift[1] === name)
      .map((record) => record[0]);

    giftMap.set(name, { give, take, giftRate: give.length - take.length });
  });

  giftMap.forEach((value, name) => {
    let receivedCount = 0;

    friends.forEach((friend) => {
      if (friend === name) return;

      const give = value.give.filter((receiver) => receiver === friend).length;
      const take = value.take.filter((giver) => giver === friend).length;

      if (give === take) {
        if (value.giftRate > giftMap.get(friend).giftRate) receivedCount += 1;
      } else if (give > take) {
        receivedCount += 1;
      }
    });

    if (receivedCount > answer) answer = receivedCount;
  });

  return answer;
}

// ============= 테스트용 코드 (답안엔 없음) =============
const friends = ['muzi', 'ryan', 'frodo', 'neo'];
const gifts = [
  'muzi frodo',
  'muzi frodo',
  'ryan muzi',
  'ryan muzi',
  'ryan muzi',
  'frodo muzi',
  'frodo ryan',
  'neo muzi',
];
console.log(solution(friends, gifts));
