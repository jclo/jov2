/* global describe, it */
/* eslint max-len: [1, 100], curly: 0, no-underscore-dangle: 0, no-unused-expressions: 0
   no-continue: 0 */

// -- Node modules
var fs     = require('fs')
  , expect = require('chai').expect
  ;

// -- Local modules
var jov2 = require('../index.js')
  ;

// -- Local constants
var DB = '_db/chateaux.ov2'
  , NOACCESS = '_db/noaccess.ov2'
  , WRONGDB  = '_db/wrong.ov2'
  ;

// -- Local variables

// -- Private functions

/**
 * Deletes temporary OV2 DB.
 *
 * @function ()
 * @private
 * @param {}            -,
 * @returns {}          -,
 */
function _deleteTestDb() {
  var isFile
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


// -- Main

// First create false DB:
_createTestDb();

describe('Test the jov2 library:', function() {
  describe('Test the test databases files:', function() {
    it('Expects ' + DB + ' to exist and can be read.', function(done) {
      fs.access(DB, fs.R_OK, function(error) {
        expect(error).to.be.null;
        done();
      });
    });

    it('Expects ' + WRONGDB + ' to exist and can be read.', function(done) {
      fs.access(WRONGDB, fs.R_OK, function(error) {
        expect(error).to.be.null;
        done();
      });
    });

    it('Expects ' + NOACCESS + ' to exist.', function(done) {
      fs.stat(NOACCESS, function(error) {
        expect(error).to.be.null;
        done();
      });
    });

    it('Expects ' + NOACCESS + ' to be unreadable.', function(done) {
      fs.access(NOACCESS, fs.R_OK, function(error) {
        expect(error).not.to.be.null;
        done();
      });
    });
  });

  describe('Test the method getRecord():', function() {
    var ov2
      , type0
      , type1
      , type2
      , type3
      ;

    // Extract a specimen of each type:
    function _extract() {
      var i;

      for (i = 0; i < ov2.length; i++) {
        if (ov2[i].type === 0)
          if (type0 === undefined) {
            type0 = ov2[i];
            continue;
          }

        if (ov2[i].type === 1)
          if (type1 === undefined) {
            type1 = ov2[i];
            continue;
          }

        if (ov2[i].type === 2)
          if (type2 === undefined) {
            type2 = ov2[i];
            continue;
          }

        if (ov2[i].type === 3)
          if (type3 === undefined) {
            type3 = ov2[i];
            continue;
          }
      }
    }

    it('Expects the method to throw an error if the database name isn\'t provided.', function() {
      expect(function() { jov2.getRecord(); }).to.throw('You must provide a database name!');
    });

    it('Expects the method to return an array.', function(done) {
      jov2.getRecord(DB, function(data) {
        ov2 = data;
        expect(data).to.be.an('array');
        _extract();
        done();
      });
    });

    it('Expects the method to return an array of objects.', function() {
      expect(ov2[0]).to.be.an('object');
    });

    // Anayse objects type 1:
    describe('The object type 1:', function() {
      it('Expects it to have the property "record".', function() {
        expect(type1).to.have.property('record');
      });

      it('Expects it to have the property "type".', function() {
        expect(type1).to.have.property('type');
      });

      it('Expects it to have the property "bytes".', function() {
        expect(type1).to.have.property('bytes');
      });

      it('Expects it to have the property "λwest".', function() {
        expect(type1).to.have.property('λwest');
      });

      it('Expects it to have the property "φsouth".', function() {
        expect(type1).to.have.property('φsouth');
      });

      it('Expects it to have the property "λeast".', function() {
        expect(type1).to.have.property('λeast');
      });

      it('Expects it to have the property "φnorth".', function() {
        expect(type1).to.have.property('φnorth');
      });
    });

    // Anayse objects type 2:
    describe('The object type 2:', function() {
      it('Expects it to have the property "record".', function() {
        expect(type2).to.have.property('record');
      });

      it('Expects it to have the property "type".', function() {
        expect(type2).to.have.property('type');
      });

      it('Expects it to have the property "length".', function() {
        expect(type2).to.have.property('length');
      });

      it('Expects it to have the property "λ".', function() {
        expect(type2).to.have.property('λ');
      });

      it('Expects it to have the property "φ".', function() {
        expect(type2).to.have.property('φ');
      });

      it('Expects it to have the property "info".', function() {
        expect(type2).to.have.property('info');
      });

      it('Expects it to delete test db.', function() {
        _deleteTestDb();
        expect(true).to.be.true;
      });
    });
  });
});
