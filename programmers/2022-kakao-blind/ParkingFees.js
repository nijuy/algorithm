function solution(fees, records) {
  const answer = [];
  const carBeforeSort = new Map();

  const [DEFAULT_TIME, DEFAULT_FEE, UNIT_TIME, UNIT_FEE] = fees;
  const LAST_OUT = 1439;

  records.forEach((record) => {
    let [time, number] = record.split(' ');
    time = getMinutes(time);

    if (carBeforeSort.has(number)) {
      carBeforeSort.set(number, [...carBeforeSort.get(number), time]);
    } else {
      carBeforeSort.set(number, [time]);
    }
  });

  let carAfterSort = [...carBeforeSort.entries()].sort(
    (a, b) => Number(a[0]) - Number(b[0]),
  );
  carAfterSort = new Map(carAfterSort);

  carAfterSort.forEach((movements) => {
    if (movements.length % 2) movements.push(LAST_OUT);

    let totalParking = -DEFAULT_TIME;
    for (let i = 1; i < movements.length; i += 2) {
      totalParking += movements[i] - movements[i - 1];
    }

    if (totalParking < 0) {
      totalParking = 0;
    }
    answer.push(DEFAULT_FEE + Math.ceil(totalParking / UNIT_TIME) * UNIT_FEE);
  });

  return answer;
}

function getMinutes(time) {
  const [hour, minute] = time.split(':');
  return Number(hour) * 60 + Number(minute);
}

// ============= 테스트용 코드 (답안엔 없음) =============
const fees = [120, 0, 60, 591];
const records = [
  '16:00 3961 IN',
  '16:00 0202 IN',
  '18:00 3961 OUT',
  '18:00 0202 OUT',
  '23:58 3961 IN',
];
const result = [0, 591];
console.log(solution(fees, records, result));
