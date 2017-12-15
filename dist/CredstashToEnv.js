'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _coPrompt = require('co-prompt');

var _coPrompt2 = _interopRequireDefault(_coPrompt);

var _lodash = require('lodash');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _nodecredstash = require('nodecredstash');

var _nodecredstash2 = _interopRequireDefault(_nodecredstash);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _handlerHelpers = require('./helpers/handlerHelpers');

var _envFileHelpers = require('./helpers/envFileHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return (0, _bluebird.resolve)(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
  handlersDir: './handlers',
  region: 'eu-west-1',
  table: 'credential-store',
  projectName: 'credstash-to-envs'
};

var debug = (0, _debug2.default)('credstash-to-envs');

var CredstashToEnv = function () {
  function CredstashToEnv() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CredstashToEnv);

    this.config = (0, _lodash.assign)(defaultConfig, config);
    this.configure();
  }

  _createClass(CredstashToEnv, [{
    key: 'configure',
    value: function configure() {
      var _this = this;

      debug('Configure credstash...');
      var credstash = new _nodecredstash2.default({ table: this.config.table, awsOpts: { region: this.config.region } });

      debug('Init commanderjs...');
      _commander2.default.version('0.1.0');

      debug('Register handlers...');
      this.handlers = (0, _lodash.map)((0, _handlerHelpers.getHandlers)(this.config.handlersDir), function (Handler) {
        var h = new Handler.default(_commander2.default, credstash, _this.config.projectName);
        if (h.option) {
          h.option();
        }

        return h;
      });

      debug('Sort handlers...');
      this.handlers.sort(_handlerHelpers.sortHandlers);
      _commander2.default.parse(process.argv);
    }
  }, {
    key: 'execute',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var handlers;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                handlers = this.handlers;
                return _context3.abrupt('return', (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function main() {
                  var overwrite;
                  return regeneratorRuntime.wrap(function main$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(0, _envFileHelpers.isEnvFileExists)()) {
                            _context2.next = 8;
                            break;
                          }

                          _context2.next = 3;
                          return _coPrompt2.default.confirm('The file already exists, would you like to overwrite it? [y/n]');

                        case 3:
                          overwrite = _context2.sent;

                          if (overwrite) {
                            _context2.next = 8;
                            break;
                          }

                          debug('Do not overwrite the file');

                          process.exit();
                          return _context2.abrupt('return');

                        case 8:

                          (function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                              var params, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, handler;

                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      params = {};
                                      _iteratorNormalCompletion = true;
                                      _didIteratorError = false;
                                      _iteratorError = undefined;
                                      _context.prev = 4;
                                      _iterator = handlers[Symbol.iterator]();

                                    case 6:
                                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                        _context.next = 17;
                                        break;
                                      }

                                      handler = _step.value;
                                      _context.t0 = _lodash.assign;
                                      _context.t1 = {};
                                      _context.next = 12;
                                      return handler.exec(params);

                                    case 12:
                                      _context.t2 = _context.sent;
                                      params = (0, _context.t0)(_context.t1, _context.t2);

                                    case 14:
                                      _iteratorNormalCompletion = true;
                                      _context.next = 6;
                                      break;

                                    case 17:
                                      _context.next = 23;
                                      break;

                                    case 19:
                                      _context.prev = 19;
                                      _context.t3 = _context['catch'](4);
                                      _didIteratorError = true;
                                      _iteratorError = _context.t3;

                                    case 23:
                                      _context.prev = 23;
                                      _context.prev = 24;

                                      if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                      }

                                    case 26:
                                      _context.prev = 26;

                                      if (!_didIteratorError) {
                                        _context.next = 29;
                                        break;
                                      }

                                      throw _iteratorError;

                                    case 29:
                                      return _context.finish(26);

                                    case 30:
                                      return _context.finish(23);

                                    case 31:
                                      _context.next = 33;
                                      return (0, _envFileHelpers.writeEnvFile)(params);

                                    case 33:
                                      process.exit();

                                    case 34:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee, this, [[4, 19, 23, 31], [24,, 26, 30]]);
                            }));

                            function handleAndWrite() {
                              return _ref2.apply(this, arguments);
                            }

                            return handleAndWrite;
                          })()();

                        case 9:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, main, this);
                })));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function execute() {
        return _ref.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return CredstashToEnv;
}();

exports.default = CredstashToEnv;
//# sourceMappingURL=CredstashToEnv.js.map