// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(jOV2, libname, version) {
  describe('jOV2 introspection:', () => {
    describe('Test the nature of jOV2:', () => {
      it('Expects jOV2 to be an object.', () => {
        expect(jOV2).to.be.an('object');
      });

      it('Expects jOV2 to own 6 properties.', () => {
        expect(Object.keys(jOV2)).to.be.an('array').that.has.lengthOf(6);
      });
    });

    describe('Check the owned generic properties:', () => {
      it(`Expects jOV2 to own the property "NAME" whose value is "${libname}".`, () => {
        expect(jOV2).to.own.property('NAME').that.is.equal(libname);
      });

      it(`Expects jOV2 to own the property "VERSION" whose value is "${version}".`, () => {
        expect(jOV2).to.own.property('VERSION');
      });

      it('Expects jOV2 to own the property "_library" that is an object.', () => {
        expect(jOV2).to.own.property('_library').that.is.an('object');
      });

      it('Expects jOV2 to own the property "_setTestMode" that is a function.', () => {
        expect(jOV2).to.own.property('_setTestMode').that.is.a('function');
      });

      it('Expects jOV2 to own the property "whoami" that is a function.', () => {
        expect(jOV2).to.own.property('whoami').that.is.a('function');
      });

      describe('Test the owned generic properties:', () => {
        it('Expects the property "_library" to own two properties.', () => {
          expect(Object.keys(jOV2.whoami())).to.be.an('array').that.has.lengthOf(2);
        });
        it(`Expects the property "_library" to own the property "name" whose value is "${libname}".`, () => {
          expect(jOV2.whoami()).to.own.property('name').that.is.equal(libname);
        });
        it(`Expects the property "_library" to own the property "version" whose value is "${version}".`, () => {
          expect(jOV2.whoami()).to.own.property('version').that.is.equal(version);
        });

        it('Expects the property "_setTestMode" to return an array with 0 item.', () => {
          expect(jOV2._setTestMode()).to.be.an('array').that.has.lengthOf(0);
        });

        it('Expects the property "whoami" to return an object.', () => {
          expect(jOV2.whoami()).to.be.an('object');
        });
        it('Expects this object to own two properties.', () => {
          expect(Object.keys(jOV2.whoami())).to.be.an('array').that.has.lengthOf(2);
        });
        it(`Expects this object to own the property "name" whose value is "${libname}".`, () => {
          expect(jOV2.whoami()).to.own.property('name').that.is.equal(libname);
        });
        it(`Expects this object to own the property "version" whose value is "${version}".`, () => {
          expect(jOV2.whoami()).to.own.property('version').that.is.equal(version);
        });
      });
    });

    describe('Check the owned specific properties:', () => {
      it('Expects jOV2 to own the property "getRecord" that is a function.', () => {
        expect(jOV2).to.own.property('getRecord').that.is.a('function');
      });

      describe('Test the owned specific properties:', () => {
        //
      });
    });
  });
};
