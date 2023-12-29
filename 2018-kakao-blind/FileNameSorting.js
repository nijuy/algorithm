function solution(files) {
  var answer = [];

  const numberReg = /\d+/;
  files.reduce((_, current) => {
    const number = current.match(numberReg)[0];
    const headTail = current.replace(number, '!');
    const [head, tail] = headTail.split('!');

    answer.push({ number, head, tail, origin: current });
    return answer;
  }, answer);

  answer.sort((fileA, fileB) => {
    const headA = fileA.head.toLowerCase();
    const headB = fileB.head.toLowerCase();

    if (headA < headB) return -1;
    if (headA > headB) return 1;

    return Number(fileA.number) - Number(fileB.number);
  });

  answer = answer.map((fileObj) => fileObj.origin);
  return answer;
}
