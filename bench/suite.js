const benchmark = require('./benchmark');

class Suite {
  constructor() {
    this.fns = [];
  }

  add(name, fn) {
    this.fns.push({ name, fn });
  }

  run() {
    const results = [];
    for (let i = 0; i < this.fns.length; i += 1) {
      console.log(`Running "${this.fns[i].name}"`);
      const result = benchmark(this.fns[i].fn);
      results.push({ name: this.fns[i].name, ops: result.ops });
    }
    return results.sort((a, b) => b.ops - a.ops);
  }
}

module.exports = Suite;
