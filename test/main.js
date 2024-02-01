// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules


// -- Local Modules
const jOV2    = require('../index')
    , pack    = require('../package.json')
    , testlib = require('./int/lib')
    , Db      = require('./int/db')
    , testre  = require('./int/record')
    ;


// -- Local Constants
const libname  = 'jOV2'
    , DB       = '_db/chateaux.ov2'
    , NOACCESS = '_db/noaccess.ov2'
    , WRONGDB  = '_db/wrong.ov2'
    ;


// -- Local Variables


// -- Main
describe('Test jOV2:', () => {
  testlib(jOV2, libname, pack.version, 'without new');

  // Create false databases:
  Db.create(NOACCESS, WRONGDB);

  // Test that all the required databases exist:
  Db.test(DB, NOACCESS, WRONGDB);

  // Test the method getRecord():
  testre(jOV2, DB);

  // Delete the false databases:
  Db.delete(NOACCESS, WRONGDB);
});
