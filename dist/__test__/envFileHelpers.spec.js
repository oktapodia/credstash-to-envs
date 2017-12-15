'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _envFileHelpers = require('../helpers/envFileHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('fs');

describe('envFileHelpers', function () {
  describe('isEnvFileExists', function () {
    test('return true if the file exists', function () {
      _fs2.default.setExistsStatus(true);
      expect((0, _envFileHelpers.isEnvFileExists)()).toBe(true);
    });
    test('return false if the file does not exists', function () {
      _fs2.default.setExistsStatus(false);
      expect((0, _envFileHelpers.isEnvFileExists)()).toBe(false);
    });
  });
  describe('removeNamePrefix', function () {
    test('return the name without the prefix without leading slash', function () {
      expect((0, _envFileHelpers.removeNamePrefix)('first')).toBe('first');
    });
    test('return the name without the prefix with 1 segment', function () {
      expect((0, _envFileHelpers.removeNamePrefix)('/first')).toBe('first');
    });
    test('return the name without the prefix with 2 segments', function () {
      expect((0, _envFileHelpers.removeNamePrefix)('/first/second')).toBe('second');
    });
  });
  describe('convertObjectToPlainData', function () {
    test('convert an object to plain data', function () {
      expect((0, _envFileHelpers.convertObjectToPlainData)({ foo: 'test', bar: 'test2' })).toBe('foo=test\nbar=test2\n');
    });
  });
  describe('writeEnvFile', function () {
    test('write file with success', function () {
      expect((0, _envFileHelpers.writeEnvFile)({ foo: 'test', bar: 'test2' })).resolves.toBe(undefined);
    });
    test('write file with error', function () {
      expect((0, _envFileHelpers.writeEnvFile)({ status: 'error', bar: 'test2' })).rejects.toEqual({
        error: 'An error occured'
      });
    });
  });
});
//# sourceMappingURL=envFileHelpers.spec.js.map