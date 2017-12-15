'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _CredstashToEnv = require('../CredstashToEnv');

var _CredstashToEnv2 = _interopRequireDefault(_CredstashToEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('fs');
// jest.mock('nodecredstash');

describe('CredstashToEnv', function () {
  var handlersDir = _path2.default.resolve(__dirname, 'fixtures');
  var classToTest = null;

  beforeAll(function () {
    _fs2.default.setReadDirSyncData(['a', 'b']);
    classToTest = new _CredstashToEnv2.default({ handlersDir: handlersDir });
  });

  describe('constructor()', function () {
    test('have a default configuration', function () {
      var expectedConfig = {
        handlersDir: handlersDir,
        region: 'eu-west-1',
        table: 'credential-store',
        projectName: 'test'
      };
      var credstashToEnv = new _CredstashToEnv2.default(expectedConfig);

      expect(credstashToEnv.config).toEqual(expectedConfig);
    });
    test('can change the default configuration', function () {
      var credstashToEnv = new _CredstashToEnv2.default({ projectName: 'test' });

      var expectedConfig = {
        handlersDir: handlersDir,
        region: 'eu-west-1',
        table: 'credential-store',
        projectName: 'test'
      };
      expect(credstashToEnv.config).toEqual(expectedConfig);
    });
  });
  describe('configure()', function () {
    test('should have the handler configured', function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = classToTest.handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var handler = _step.value;

          expect(handler.program.Command.constructor.name).toEqual(_commander.Command.constructor.name);
          expect(!handler.credstash).toBe(false); // TODO: Better test the credstash exists
          expect(handler.projectName).toEqual('credstash-to-env');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  });
  describe('execute()', function () {}); // TODO: Don't know how to test it yet
});
//# sourceMappingURL=credstashToEnv.spec.js.map