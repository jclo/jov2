// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0, no-continue: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Extracts data from the database.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the database,
 * @returns {}              -,
 */
function _extract(data) {
  const ov2 = data;
  let type0
    , type1
    , type2
    , type3
    ;

  for (let i = 0; i < ov2.length; i++) {
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

  return {
    ov2, type0, type1, type2, type3,
  };
}


// -- Main
module.exports = function(jOV2, DB) {
  describe('Test the getRecord() method:', () => {
    it('Expects the "getRecord" to return an error if the database name isn\'t provided.', () => {
      jOV2.getRecord()
        .then(() => {
          expect(false).to.be.equal(true);
        })
        .catch((e) => {
          expect(e).to.be.a('string');
        });
    });

    it('Expects getRecord to return a promise.', () => {
      jOV2.getRecord(DB)
        .then((data) => {
          expect(data).to.be.an('array');
        })
        .catch((e) => {
          throw new Error(e);
        });
    });

    let result;
    it('Expects the "getRecord" to return an array.', (done) => {
      jOV2.getRecord(DB, (err, data) => {
        result = _extract(data);
        expect(data).to.be.an('array');
        done();
      });
    });

    it('Expects the method to return an array of objects.', () => {
      expect(result.ov2[0]).to.be.an('object');
    });

    // Analyse object type 0:
    describe('The object type 0:', () => {
      it('Expects object type 0 to be undefined.', () => {
        expect(result.type0).to.be.equal(undefined);
      });
    });

    // Anayse objects type 1:
    describe('The object type 1:', () => {
      it('Expects it to own 7 properties.', () => {
        expect(Object.keys(result.type1)).to.be.an('array').that.has.lengthOf(7);
      });

      it('Expects it to own the property "record".', () => {
        expect(result.type1).to.own.property('record');
      });

      it('Expects it to own the property "type".', () => {
        expect(result.type1).to.own.property('type');
      });

      it('Expects it to own the property "bytes".', () => {
        expect(result.type1).to.own.property('bytes');
      });

      it('Expects it to own the property "λwest".', () => {
        expect(result.type1).to.own.property('λwest');
      });

      it('Expects it to own the property "φsouth".', () => {
        expect(result.type1).to.own.property('φsouth');
      });

      it('Expects it to own the property "λeast".', () => {
        expect(result.type1).to.own.property('λeast');
      });

      it('Expects it to own the property "φnorth".', () => {
        expect(result.type1).to.own.property('φnorth');
      });
    });

    // Anayse objects type 2:
    describe('The object type 2:', () => {
      it('Expects it to own 6 properties.', () => {
        expect(Object.keys(result.type2)).to.be.an('array').that.has.lengthOf(6);
      });

      it('Expects it to own the property "record".', () => {
        expect(result.type2).to.own.property('record');
      });

      it('Expects it to own the property "type".', () => {
        expect(result.type2).to.own.property('type');
      });

      it('Expects it to own the property "length".', () => {
        expect(result.type2).to.own.property('length');
      });

      it('Expects it to own the property "λ".', () => {
        expect(result.type2).to.own.property('λ');
      });

      it('Expects it to own the property "φ".', () => {
        expect(result.type2).to.own.property('φ');
      });

      it('Expects it to own the property "info".', () => {
        expect(result.type2).to.own.property('info');
      });
    });

    // Analyse object type 3:
    describe('The object type 3:', () => {
      it('Expects object type 3 to be undefined.', () => {
        expect(result.type3).to.be.equal(undefined);
      });
    });
  });
};
