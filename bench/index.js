const levenshteinEditDistance = require('levenshtein-edit-distance');
const fastLevenshtein = require('fast-levenshtein').get;
const levenshteinComponent = require('levenshtein-component');
const ld = require('ld').computeDistance;
const levdist = require('levdist');
const natural = require('natural').LevenshteinDistance;
const levenshtein = require('levenshtein');
const talisman = require('talisman/metrics/distance/levenshtein');
const leven = require('leven');
const Suite = require('./suite');
const myleven = require('../src');

function run(fn) {
  fn('a', 'b');
  fn('ab', 'ac');
  fn('ac', 'bc');
  fn('abc', 'axc');
  fn('kitten', 'sitting');
  fn('xabxcdxxefxgx', '1ab2cd34ef5g6');
  fn('cat', 'cow');
  fn('xabxcdxxefxgx', 'abcdefg');
  fn('javawasneat', 'scalaisgreat');
  fn('example', 'samples');
  fn('sturgeon', 'urgently');
  fn('levenshtein', 'frankenstein');
  fn('distance', 'difference');
  fn('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文');
  fn(
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
  );
}

function numberWithCommas(x, pad = 0) {
  let result = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (pad > 0) {
    while (result.length < pad) {
      result = ` ${result}`;
    }
  }
  return result;
}

const suite = new Suite();
suite.add('leven', () => run(leven));
suite.add('@caijs/leven', () => run(myleven));
suite.add('levenshtein-edit-distance', () => run(levenshteinEditDistance));
suite.add('fast-levenshtein', () => run(fastLevenshtein));
suite.add('levenshtein-component', () => run(levenshteinComponent));
suite.add('ld', () => run(ld));
suite.add('levdist', () => run(levdist));
suite.add('natural', () => run(natural));
suite.add('levenshtein', () => run(levenshtein));
suite.add('talisman', () => run(talisman));
const results = suite.run();
const pad = numberWithCommas(Math.round(results[0].ops)).length + 8;
for (let i = 0; i < results.length; i += 1) {
  const result = results[i];
  console.log(
    `${numberWithCommas(Math.round(result.ops), pad)} op/s » ${result.name}`
  );
}
