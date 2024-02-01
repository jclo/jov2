/** ****************************************************************************
 *
 * A library that reads OV2 POI databases.
 *
 * jov2.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Private Static Methods:
 *  . _setTestMode                returns internal objects for testing purpose,
 *
 *
 * Public Static Methods:
 *  . whoami                      returns the library name and version,
 *  . getRecord                   Returns the database contents,
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


// -- Local Modules
const pack    = require('../package.json')
    , readOv2 = require('./private/readov2')
    ;


// -- Local Constants
const LIBNAME = 'jOV2';


// -- Local Variables


// -- Main ---------------------------------------------------------------------

const jOV2 = {

  // Useful to retrieve the library name and version when it is
  // embedded in another library as an object:
  _library: { name: LIBNAME, version: pack.version },


  // -- Private Static Methods -------------------------------------------------

  /**
   * Returns the internal objects for testing purpose.
   * (must not be deleted)
   *
   * @method ()
   * @private
   * @param {}            -,
   * @returns {Object}    returns a list of internal objects,
   * @since 0.0.0
   */
  _setTestMode() {
    return [];
  },


  // -- Public Static Methods --------------------------------------------------

  /**
   * Returns the library name and version.
   * (must not be deleted)
   *
   * @method ()
   * @public
   * @param {}            -,
   * @returns {Object}    returns the library name and version,
   * @since 0.0.0
   */
  whoami() {
    return this._library;
  },

  /**
   * Returns the database contents.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}      the database name,
   * @param {Function}    the callback function to call at completion,
   * @returns {Object}    returns a promise,
   * @since 0.0.0
   */
  getRecord(db, callback) {
    return new Promise((resolve, reject) => {
      readOv2(db, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
        if (callback) {
          callback(err, data);
        }
      });
    });
  },
};

// Attaches constants to jOV2 that provide name and version of the lib.
jOV2.NAME = LIBNAME;
jOV2.VERSION = pack.version;


// -- Export
module.exports = jOV2;
