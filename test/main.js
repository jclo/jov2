/* global describe, it */
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, no-continue: 0 */

// -- Node modules
const fs     = require('fs')
    , expect = require('chai').expect
    ;

// -- Local modules
const jov2 = require('../index.js')
    ;

// -- Local constants
const DB     = '_db/chateaux.ov2'
  , NOACCESS = '_db/noaccess.ov2'
  , WRONGDB  = '_db/wrong.ov2'
  ;

// -- Local variables


// -- Private functions --------------------------------------------------------
/* eslint-disable no-underscore-dangle */

/**
 * Deletes temporary OV2 DB.
 *
 * @function ()
 * @private
 * @param {}            -,
 * @returns {}          -,
 */
function _deleteTestDb() {
  let isFile
    ;

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
}

/**
 * Creates temporary OV2 DB.
 *
 * @function ()
 * @private
 * @param {}            -,
 * @returns {}          -,
 */
function _createTestDb() {
  // Delete previous file if any:
  _deleteTestDb();

  // Create NOACCESS:
  fs.writeFileSync(NOACCESS, '', { mode: '000' });
  // Create WRONGDB:
  fs.writeFileSync(WRONGDB, 'aaa fff zzz ff  eer', { mode: '755' });
}
/* eslint-enable no-underscore-dangle */


// -- Public section -----------------------------------------------------------

// First create false DB:
_createTestDb();

describe('Test the jov2 library:', () => {
  describe('Test the test databases files:', () => {
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

    it(`Expects ${NOACCESS} to be unreadable.`, (done) => {
      fs.access(NOACCESS, fs.R_OK, (error) => {
        expect(error).not.to.be.equal(null);
        done();
      });
    });
  });

  describe('Test the method getRecord():', () => {
    let ov2
      , type0
      , type1
      , type2
      , type3
      ;

    // Extract a specimen of each type:
    /* eslint-disable no-underscore-dangle */
    function _extract() {
      let i;

      for (i = 0; i < ov2.length; i++) {
        if (ov2[i].type === 0) {
          if (type0 === undefined) {
            type0 = ov2[i];
            continue;
          }
        }

        if (ov2[i].type === 1) {
          if (type1 === undefined) {
            type1 = ov2[i];
            continue;
          }
        }

        if (ov2[i].type === 2) {
          if (type2 === undefined) {
            type2 = ov2[i];
            continue;
          }
        }

        if (ov2[i].type === 3) {
          if (type3 === undefined) {
            type3 = ov2[i];
            continue;
          }
        }
      }
    }
    /* eslint-enable no-underscore-dangle */

    it('Expects the method to throw an error if the database name isn\'t provided.', () => {
      expect(() => { jov2.getRecord(); }).to.throw('You must provide a database name!');
    });

    it('Expects the method to return an array.', (done) => {
      jov2.getRecord(DB, (data) => {
        ov2 = data;
        expect(data).to.be.an('array');
        _extract();
        done();
      });
    });

    it('Expects the method to return an array of objects.', () => {
      expect(ov2[0]).to.be.an('object');
    });

    // Anayse objects type 1:
    describe('The object type 1:', () => {
      it('Expects it to have the property "record".', () => {
        expect(type1).to.have.property('record');
      });

      it('Expects it to have the property "type".', () => {
        expect(type1).to.have.property('type');
      });

      it('Expects it to have the property "bytes".', () => {
        expect(type1).to.have.property('bytes');
      });

      it('Expects it to have the property "λwest".', () => {
        expect(type1).to.have.property('λwest');
      });

      it('Expects it to have the property "φsouth".', () => {
        expect(type1).to.have.property('φsouth');
      });

      it('Expects it to have the property "λeast".', () => {
        expect(type1).to.have.property('λeast');
      });

      it('Expects it to have the property "φnorth".', () => {
        expect(type1).to.have.property('φnorth');
      });
    });

    // Anayse objects type 2:
    describe('The object type 2:', () => {
      it('Expects it to have the property "record".', () => {
        expect(type2).to.have.property('record');
      });

      it('Expects it to have the property "type".', () => {
        expect(type2).to.have.property('type');
      });

      it('Expects it to have the property "length".', () => {
        expect(type2).to.have.property('length');
      });

      it('Expects it to have the property "λ".', () => {
        expect(type2).to.have.property('λ');
      });

      it('Expects it to have the property "φ".', () => {
        expect(type2).to.have.property('φ');
      });

      it('Expects it to have the property "info".', () => {
        expect(type2).to.have.property('info');
      });

      it('Expects it to delete test db.', () => {
        _deleteTestDb();
        expect(true).to.be.equal(true);
      });
    });
  });
});
