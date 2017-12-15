'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeEnvFile = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var writeEnvFile = exports.writeEnvFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _bluebird2.default(function (resolve, reject) {
              _fs2.default.writeFile(envFilePath, convertObjectToPlainData(data), function (err) {
                if (err) {
                  return reject(err);
                }
                // eslint-disable-next-line
                console.log('file written successfully');

                return resolve();
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function writeEnvFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.isEnvFileExists = isEnvFileExists;
exports.convertObjectToPlainData = convertObjectToPlainData;
exports.removeNamePrefix = removeNamePrefix;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return (0, _bluebird.resolve)(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var envFilePath = '.env';
function isEnvFileExists() {
  return _fs2.default.existsSync(envFilePath);
}

function convertObjectToPlainData(data) {
  var dataConverted = '';
  (0, _lodash.forEach)(data, function (value, name) {
    dataConverted += name + '=' + value + '\n';
  });

  return dataConverted;
}

function removeNamePrefix(name) {
  var splittedName = name.split('/');
  return splittedName[splittedName.length - 1];
}
//# sourceMappingURL=envFileHelpers.js.map