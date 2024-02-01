# jOV2

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Github workflow][ci-image]][ci-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![License][license-image]](LICENSE.md)

jOV2 is a light Javascript API for extracting POI (Point Of Interest) from an OV2 database file. OV2 is a binary POI database defined by TomTom.


## Quick Startup

### Extract records from the database

#### From a callback
```js
const jov2 = require('jov2');

jov2.getRecord('path/to/db/file', (err, data) => {
  console.log(data);
});
```

#### From a promise
```js
const jov2 = require('jov2');

jov2.getRecord('path/to/db/file')
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });
```

This method returns an `array` of records. Each record is a Javascript object. The record with type 2, a simple POI record, looks like:

```js
{
  record: 2377,
  type: 2,
  length: 56,
  λ: 7.75099,
  φ: 48.58101,
  info: '[Chtx nv] 67 Strasbourg - Palais des Rohan'
},
```

## API

`jov2` provides only one method:

  * `getRecord()`       extracts all the records from the database. It returns a promise.


### getRecord (db, callback)

`getRecord` requires two arguments:
  * the database name,
  * a callback function.

The callback gets two arguments: `err, data`.

`err` is `null` or an error string.

`data` is an array that contains a set of objects. Each object defines a POI (see above).

Enjoy!

## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/jov2.svg?style=flat-square
[release-image]: https://img.shields.io/github/release/jclo/jov2.svg?include_prereleases&style=flat-square
[commit-image]: https://img.shields.io/github/last-commit/jclo/jov2.svg?style=flat-square
[ci-image]: https://github.com/jclo/jov2/actions/workflows/ci.yml/badge.svg
[coveralls-image]: https://img.shields.io/coveralls/jclo/jov2/master.svg?style=flat-square
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/jov2.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/jov2.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/jov2
[release-url]: https://github.com/jclo/jov2/tags
[commit-url]: https://github.com/jclo/jov2/commits/master
[ci-url]: https://github.com/jclo/jov2/actions/workflows/ci.yml
[coveralls-url]: https://coveralls.io/github/jclo/jov2?branch=master
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/jov2
[license-url]: http://opensource.org/licenses/MIT
