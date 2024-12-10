export const dividirTimes = (times, numChaves) => {
  const result = [];
  for (let i = 0; i < numChaves; i++) {
    result.push([]);
  }
  for (let i = 0; i < times.length; i++) {
    result[i % numChaves].push(times[i]);
  }
  return result;
};