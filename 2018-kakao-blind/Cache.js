function solution(cacheSize, cities) {
  var answer = 0;

  const HIT = 1;
  const MISS = 5;
  let cache = [];

  cities.forEach((city, index) => {
    const cityLowerCase = city.toLowerCase();
    if (cache.includes(cityLowerCase)) {
      answer += HIT;
      const currentIndex = cache.indexOf(cityLowerCase);
      cache.splice(currentIndex, 1);
    } else answer += MISS;

    cache.push(cityLowerCase);

    if (cache.length > cacheSize) {
      cache = cache.slice(1);
    }
  });

  return answer;
}
