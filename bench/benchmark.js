const noop = () => {};

function delta(a, b) {
  return b[1] - a[1] + (b[0] - a[0]) * 1e9;
}

function measure(fn, duration = 100) {
  const expectedEnd = duration + Date.now();
  const result = [];
  do {
    const hrstart = process.hrtime();
    noop();
    const hrnoop = process.hrtime();
    fn();
    const hrend = process.hrtime();
    result.push(delta(hrnoop, hrend) - delta(hrstart, hrnoop));
  } while (Date.now() < expectedEnd);
  return result;
}

function compute(samples) {
  samples.splice(0, 5);
  const mean = samples.reduce((p, c) => p + c, 0) / samples.length;
  const ops = 1e9 / mean;
  return {
    mean,
    ops,
  };
}

function benchmark(fn, duration = 3300) {
  const expectedEnd = Date.now() + duration;
  let totalCount = 0;
  const result = [];
  do {
    measure(noop, 10);
    const samples = measure(fn, 100);
    for (let i = 0; i < samples.length; i += 1) {
      result.push(samples[i]);
    }
    totalCount += samples.length;
  } while (Date.now() < expectedEnd || totalCount < 10);
  return compute(result);
}

module.exports = benchmark;
