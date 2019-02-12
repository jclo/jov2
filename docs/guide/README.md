# Guide

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
