/** ****************************************************************************
 *
 * Implements the function that reads the OV2 db.
 *
 * readov2.js exports just an unique function.
 *
 * Private Functions:
 *  . _ascii2utf8                 converts extended ASCII string to UTF-8 String,
 *  . _readDB                     reads the ov2 file and returns an ov2 buffer,
 *  . _readOv2                    reads and decode OV2 database contents,
 *
 *
 * Public Function:
 *  . readOv2                     reads and decode OV2 database contents,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Module Path
const fs = require('fs');


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Converts an extended ASCII string to an UTF-8 String.
 *
 * @function (arg1)
 * @private
 * @param {Buffer}          buffer that contains a string coded in extended ASCII,
 * @returns {String}        returns the corresponding UTF-8 string,
 */
function _ascii2utf8(buffer) {
  let c
    , i
    , j
    ;

  // New buffer with utf8 string:
  const utf8 = Buffer.alloc(buffer.length * 2);

  // Convert:
  j = 0;
  for (i = 0; i < buffer.length; i++) {
    c = buffer.readUInt8(i, 1);

    if (c < 0x80) {
      utf8.writeUInt8(buffer.readUInt8(i, 1), j += 1);
    } else if (c < 0xc0) {
      utf8.writeUInt8(0xc2, j += 1);
      utf8.writeUInt8(buffer.readUInt8(i, 1), j += 1);
    } else {
      utf8.writeUInt8(0xc3, j += 1);
      utf8.writeUInt8(buffer.readUInt8(i, 1) - 0x40, j += 1);
    }
  }

  return utf8.toString('utf8', 0, j);
}

/**
 * Reads the ov2 file and returns an ov2 buffer.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the name of the database,
 * @param {Function}        the callback to call at completion,
 * @throws                  throws an error if the database doesn't exist,
 *                          is unreachable or is corrupted,
 * @returns {}              -,
 */
function _readDB(db, callback) {
  // Is db defined?
  if (db === undefined) {
    callback('You must provide a database name!');
  }

  // Check if the file exists and it's an OV2 file:
  fs.access(db, fs.R_OK, (error) => {
    // Can we reach this database?
    /* istanbul ignore next */
    if (error) {
      if (error.code === 'ENOENT') {
        callback('This database doesn\'t exist!');
      }
      if (error.code === 'EACCES') {
        callback('You don\'t have the rights to access this database!');
      } else {
        callback('???');
      }
    }

    // Ok. Is this a valid database?
    fs.readFile(db, (err, data) => {
      const byte0 = data.readUInt8(0)
        ;

      // An ov2 database starts with the type of the first record. It
      // could be 0, 1, 2 or 3.
      /* istanbul ignore next */
      if (byte0 !== 0 && byte0 !== 1 && byte0 !== 2 && byte0 !== 3) {
        callback('This database seems corrupted!');
      }
      // Everything seems ok, return the buffer:
      callback(null, data);
    });
  });
}

/**
 * Reads and decode OV2 database contents.
 *
 * Database organisation:
 *
 * DELETED RECORD:
 *   1 byte          T: type (always 0),
 *   4 bytes         L: length of this record in bytes (including the T and L fields),
 *   L−5 bytes       bytes to ignore (content undefined),
 *
 * SKIPPER RECORD:
 *   1 byte          T: type (always 1),
 *   4 bytes         number of bytes in the file, including and starting at this
 *                   record, that contain data for POI enclosed in the given
 *                   rectangle,
 *   4 bytes         X1: longitude coordinate of the west edge of the rectangle,
 *   4 bytes         Y1: latitude coordinate of the south edge of the rectangle,
 *   4 bytes         X2: longitude coordinate of the east edge of the rectangle,
 *   4 bytes         Y2: latitude coordinate of the north edge of the rectangle,
 *
 * SIMPLE POI RECORD:
 *   1 byte          T: type (always 2),
 *   4 bytes         L: length of this record in bytes (including the T and L fields),
 *   4 bytes         X: longitude coordinate of the POI,
 *   4 bytes         Y: latitude coordinate of the POI,
 *   L−13 bytes      Name: zero−terminated ASCII string specifying the name
 *                   of the POI,
 *
 * EXTENDED POI RECORD:
 *   1 byte          T: type (always 3),
 *   4 bytes         L: length of this record in bytes (including the T and L fields),
 *   4 bytes         X: longitude coordinate of the POI,
 *   4 bytes         Y: latitude coordinate of the POI,
 *   P bytes         Name: zero−terminated ASCII string specifying the name
 *                   of the POI,
 *   Q bytes         Unique ID: zero−terminated string specifying the unique ID
 *                   of the POI,
 *   L−P−Q−13 bytes  Extra data: zero−terminated string, not used yet,
 *
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the name of the database,
 * @param {Function}        the callback to call at completion,
 * @throws                  throws an error if the record type isn't decoded or unknown,
 * @returns {}              -,
 * @since 0.0.0
 */
function _readOv2(db, callback) {
  // Read the database contents:
  _readDB(db, (err, ov2) => {
    const records = [];
    let record
      , type
      , rlength
      , i
      ;

    // error?
    if (err) {
      callback(err);
    }

    // Parse the records:
    record = 0;
    i = 0;

    do {
      type = ov2.readUInt8(i + 0);
      rlength = ov2.readUInt32LE(i + 1);

      switch (type) {
        // Deleted record:
        /* istanbul ignore next */
        case 0:
          throw new Error(`The type "${type}" is not yet decoded!`);

        // Skipper Record:
        case 1:
          records[record] = {
            record,
            type,
            bytes: rlength,
            λwest: ov2.readInt32LE(i + 5) / 100000,
            φsouth: ov2.readInt32LE(i + 9) / 100000,
            λeast: ov2.readInt32LE(i + 13) / 100000,
            φnorth: ov2.readInt32LE(i + 17) / 100000,
          };

          i += 21;
          record += 1;
          break;

        // Simple POI Record:
        case 2:
          records[record] = {
            record,
            type,
            length: rlength,
            λ: ov2.readInt32LE(i + 5) / 100000,
            φ: ov2.readInt32LE(i + 9) / 100000,
            // The string is encoded in extended ascii. This format is not
            // supported by Node.js. It must be converted:
            info: _ascii2utf8(ov2.slice(i + 13, i + (rlength - 1))),
          };

          i += ov2.readUInt32LE(i + 1);
          record += 1;
          break;

        // Extended POI Record:
        /* istanbul ignore next */
        case 3:
          throw new Error(`The type "${type}" is not yet decoded!`);

        /* istanbul ignore next */
        default:
          throw new Error(`The type "${type}" is unknown!`);
      }
    } while (i < ov2.length);

    // Return the Javascript record object.
    callback(null, records);
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Reads and decode OV2 database contents.
 *
 * @function (arg1, arg2)
 * @public
 * @param {String}          the name of the database,
 * @param {Function}        the callback to call at completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function readOv2(db, callback) {
  _readOv2(db, callback);
}

// -- Export
module.exports = readOv2;
