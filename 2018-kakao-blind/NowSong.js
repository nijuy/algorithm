function solution(m, musicinfos) {
  m = replaceSharps(m);

  const filteredByMelody = musicinfos.map((info) => {
    let [start, end, title, melody] = info.split(',');
    const time = calculateTimeDifference(start, end);
    melody = replaceSharps(melody);

    if (time > melody.length) {
      melody = repeatString(melody, time);
    } else {
      melody = melody.slice(0, time);
    }

    if (melody.includes(m)) return { time, title, melody };
  });

  const validMusicInfos = filteredByMelody.filter((info) => info !== undefined);

  const sortedResult = validMusicInfos.sort(
    (infoA, infoB) => infoB.time - infoA.time,
  );

  return sortedResult[0]?.title || '(None)';
}

function replaceSharps(str) {
  let result = str;
  result = result.replaceAll('A#', 'a');
  result = result.replaceAll('C#', 'c');
  result = result.replaceAll('D#', 'd');
  result = result.replaceAll('F#', 'f');
  result = result.replaceAll('G#', 'g');
  return result;
}

function calculateTimeDifference(time1, time2) {
  const [hour1, minute1] = time1.split(':').map(Number);
  const [hour2, minute2] = time2.split(':').map(Number);

  const totalMinutes1 = hour1 * 60 + minute1;
  const totalMinutes2 = hour2 * 60 + minute2;

  const difference = Math.abs(totalMinutes2 - totalMinutes1);

  return difference;
}

function repeatString(str, length) {
  let repeatedString = str;

  while (repeatedString.length < length) {
    repeatedString += str.slice(0, length - repeatedString.length);
  }

  return repeatedString;
}

function compareNotes(notesA, notesB) {
  let indexA = 0;
  let indexB = 0;

  while (indexA < notesA.length && indexB < notesB.length) {
    if (notesA[indexA] !== notesB[indexB]) {
      indexA++;
    } else {
      indexA++;
      indexB++;
    }
  }

  return indexB === notesB.length;
}
