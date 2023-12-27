function solution(str1, str2) {
  var answer = 0;
  let intersection = 0;
  let union = 0;

  const arr1 = getChunkArray(str1);
  const arr2 = getChunkArray(str2);

  if (arr2.length === 0) return 65536;

  new Set([...arr1, ...arr2]).forEach((chunk) => {
    const count1 = getAmount(arr1, chunk);
    const count2 = getAmount(arr2, chunk);

    intersection += Math.min(count1, count2);
    union += Math.max(count1, count2);
  });

  answer = parseInt((intersection / union) * 65536);
  return answer;
}

function getChunkArray(str) {
  const lower = str.toLowerCase().split('');
  const result = lower.map((char, index) => lower.slice(index, index + 2));

  const reg = /[a-z]{2}/;
  const filteredResult = result
    .map((chunk) => {
      const part = chunk.join('');
      if (reg.test(part)) return part;
    })
    .filter((c) => c !== undefined);

  return filteredResult;
}

function getAmount(arr, e) {
  return arr.reduce((accumulator, currentValue) => {
    return currentValue === e ? accumulator + 1 : accumulator;
  }, 0);
}
