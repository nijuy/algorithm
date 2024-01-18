function solution(dartResult) {
  var totalScore = 0;

  const areaScore = {
    S: 1,
    D: 2,
    T: 3,
  };
  const areaReg = /[SDT]/;
  const optionReg = /[\*\#]/;

  const stepScore = [];
  const starIndex = new Map();

  const steps = splitStep(dartResult);

  steps.forEach((step, index) => {
    let score = parseInt(step) ** areaScore[areaReg.exec(step)];
    const option = optionReg.exec(step);

    if (option === null) {
      stepScore.push(score);
      return;
    }

    if (option[0] === '#') {
      score *= -1;
    } else if (option[0] === '*') {
      starIndex.set(index - 1, starIndex.get(index - 1) + 1 || 1);
      starIndex.set(index, starIndex.get(index) + 1 || 1);
    }

    stepScore.push(score);
  });

  stepScore.forEach((score, index) => {
    let finalStepScore = score;

    if (starIndex.has(index)) {
      finalStepScore *= 2 * starIndex.get(index);
    }

    totalScore += finalStepScore;
  });

  return totalScore;
}

function splitStep(dartResult) {
  const stepReg = /(\d+[SDT]\*?#?)/g;
  return dartResult.match(stepReg);
}
