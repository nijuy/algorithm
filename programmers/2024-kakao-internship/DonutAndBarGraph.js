function solution(edges) {
  const nodeInfo = {};

  let newNode, allGraph;
  let donut = 0;
  let bar = 0;
  let eight = 0;

  edges.forEach(([start, end]) => {
    if (!nodeInfo[start]) {
      nodeInfo[start] = { start: 0, end: 0 };
    }
    if (!nodeInfo[end]) {
      nodeInfo[end] = { start: 0, end: 0 };
    }

    nodeInfo[start].start += 1;
    nodeInfo[end].end += 1;
  });

  for (let node in nodeInfo) {
    const { start, end } = nodeInfo[node];

    if (start >= 2 && end === 0) {
      newNode = Number(node);
      allGraph = start;
    }
    if (start >= 2 && end >= 2) eight += 1;
    if (start === 0) bar += 1;
  }

  donut = allGraph - bar - eight;
  return [newNode, donut, bar, eight];
}
