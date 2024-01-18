function solution(msg) {
  var answer = [];
  const dictionary = getAlphabetMap();

  let nextChunk = '';
  msg.split('').map((char) => {
    nextChunk += char;

    if (!dictionary.has(nextChunk)) {
      dictionary.set(nextChunk, dictionary.size + 1);

      const current = nextChunk.slice(0, -1);
      answer.push(dictionary.get(current));

      nextChunk = char;
    }
  });

  if (nextChunk) {
    answer.push(dictionary.get(nextChunk));
  }

  return answer;
}

function getAlphabetMap() {
  const dictionary = new Map();

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    dictionary.set(letter, i - 64);
  }

  return dictionary;
}
