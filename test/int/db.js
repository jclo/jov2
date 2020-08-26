// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const fs         = require('fs')
    , { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Deletes the test databases.
 *
 * @function (...args)
 * @private
 * @param {...String}       the database paths,
 * @returns {}              -,
 */
function _delete(...args) {
  const [NOACCESS, WRONGDB] = args;
  let isFile;

  // Delete NOACCESS:
  isFile = true;
  try {
    isFile = fs.statSync(NOACCESS).isFile();
  } catch (e) {
    isFile = false;
  } finally {
    if (isFile) {
      fs.chmodSync(NOACCESS, '755');
      fs.unlinkSync(NOACCESS);
    }
  }

  // Delete WRONG:
  isFile = true;
  try {
    isFile = fs.statSync(WRONGDB).isFile();
  } catch (e) {
    isFile = false;
  } finally {
    if (isFile) {
      fs.chmodSync(WRONGDB, '755');
      fs.unlinkSync(WRONGDB);
    }
  }
  return true;
}

/**
 * Creates the test databases.
 *
 * @function (...args)
 * @private
 * @param {...String}       the database paths,
 * @returns {}              -,
 */
function _create(...args) {
  const [NOACCESS, WRONGDB] = args;
  _delete(...args);

  // Create NOACCESS:
  fs.writeFileSync(NOACCESS, '', { mode: '000' });
  // Create WRONGDB:
  fs.writeFileSync(WRONGDB, 'aaa fff zzz ff  eer', { mode: '755' });

  return true;
}


// -- Public -------------------------------------------------------------------

const Db = {

  /**
   * Creates the test databases.
   *
   * @method (...args)
   * @public
   * @param {...String}     the database paths,
   * @returns {}            -,
   */
  create(...args) {
    describe('Create the test databases:', () => {
      it('Expects Db.create(...) to create the test databases.', () => {
        expect(_create(...args)).to.be.equal(true);
      });
    });
  },

  /**
   * Checks the presence of the test databases.
   *
   * @method (...args)
   * @public
   * @param {...String}     the database paths,
   * @returns {}            -,
   */
  test(...args) {
    const [DB, NOACCESS, WRONGDB] = args;
    describe('Check the databases are accessible:', () => {
      it(`Expects ${DB} to exist and can be read.`, (done) => {
        fs.access(DB, fs.R_OK, (error) => {
          expect(error).to.be.equal(null);
          done();
        });
      });

      it(`Expects ${WRONGDB} to exist and can be read.`, (done) => {
        fs.access(WRONGDB, fs.R_OK, (error) => {
          expect(error).to.be.equal(null);
          done();
        });
      });

      it(`Expects ${NOACCESS} to exist.`, (done) => {
        fs.stat(NOACCESS, (error) => {
          expect(error).to.be.equal(null);
          done();
        });
      });
    });
  },

  /**
   * Deletes the test databases.
   *
   * @method (...args)
   * @public
   * @param {...String}     the database paths,
   * @returns {}            -,
   */
  delete(...args) {
    describe('Delete the test databases:', () => {
      it('Expects Db.delete(...) to delete the test databases.', () => {
        expect(_delete(...args)).to.be.equal(true);
      });
    });
  },
};


// Export
module.exports = Db;
