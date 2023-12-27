function solution(n, arr1, arr2) {
  var answer = [];

  const binaryArr1 = decimalToBinary(arr1, n);
  const binaryArr2 = decimalToBinary(arr2, n);

  binaryArr1.forEach((element, index) => {
    const result = calculateStep(element, binaryArr2[index]);
    answer.push(result);
  });

  return answer;
}

function decimalToBinary(arr, length) {
  return arr.reduce((current, number) => {
    current.push(number.toString(2).padStart(length, '0'));
    return current;
  }, []);
}

function calculateStep(str1, str2) {
  const result = str1.split('').reduce((current, char, index) => {
    current.push(isWall(Number(char), Number(str2[index])));
    return current;
  }, []);

  return result.join('');
}

function isWall(str1, str2) {
  return str1 || str2 ? '#' : ' ';
}
