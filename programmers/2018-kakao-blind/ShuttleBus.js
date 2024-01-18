function solution(n, t, m, timetable) {
  timetable = timetable
    .map((time) => {
      const [hour, minute] = time.split(':');
      return Number(hour) * 60 + Number(minute);
    })
    .sort((a, b) => a - b);

  const START = 540;
  const busTimeTable = new Map();

  for (let i = 0; i < n; i++) {
    const nextArrival = START + i * t;
    busTimeTable.set(nextArrival, []);
  }

  busTimeTable.forEach((_, arrival) => {
    const canTake = timetable.filter((time) => time <= arrival);

    if (canTake.length > m) {
      busTimeTable.set(arrival, canTake.slice(0, m));
      timetable.splice(0, m);
    } else {
      busTimeTable.set(arrival, canTake);
      timetable.splice(0, canTake.length);
    }
  });

  const lastBus = Array.from(busTimeTable.keys()).pop();
  const lastBusCrew = busTimeTable.get(lastBus);
  const lastBusLastCrew = lastBusCrew[lastBusCrew.length - 1];

  if (lastBusCrew.length < m) return strToTime(lastBus);
  return strToTime(lastBusLastCrew - 1);
}

function strToTime(minute) {
  const hour = String(parseInt(minute / 60)).padStart(2, '0');
  const min = String(minute % 60).padStart(2, '0');

  return `${hour}:${min}`;
}

function getCloseBus(busTimeTable, arrivalTime) {
  let takeTime = '';

  busTimeTable.forEach((_, busArrival) => {
    if (busArrival >= arrivalTime) {
      if (takeTime === '') takeTime = busArrival;
    }
  });

  return takeTime;
}
