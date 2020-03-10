# @caijs/leven

[![Build Status](https://travis-ci.com/CAI-js/leven.svg?branch=master)](https://travis-ci.com/CAI-js/leven)
[![NPM version](https://img.shields.io/npm/v/@caijs/leven.svg?style=flat)](https://www.npmjs.com/package/@caijs/leven)
[![NPM downloads](https://img.shields.io/npm/dm/@caijs/leven.svg?style=flat)](https://www.npmjs.com/package/@caijs/leven)

Measure the difference between two strings

Is a javascript implementation of the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm


## Install

```
$ npm install @caijs/leven
```


## Usage

```js
const leven = require('@caijs/leven');

leven('cat', 'cow');
//=> 2
```


## Benchmark

```
$ npm run bench
```

```
        279,295 op/s » @caijs/leven
        248,323 op/s » leven
        240,445 op/s » talisman
          1,281 op/s » levenshtein-edit-distance
            776 op/s » fast-levenshtein
            754 op/s » levenshtein-component
            244 op/s » levenshtein
            202 op/s » levdist
            197 op/s » ld
             11 op/s » natural
```