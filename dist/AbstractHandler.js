'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash');

var _envFileHelpers = require('./helpers/envFileHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('credstash-to-envs');

var AbstractHandler = function () {
  function AbstractHandler(program, credstash, projectName) {
    _classCallCheck(this, AbstractHandler);

    this.program = program;
    this.credstash = credstash;
    this.projectName = projectName;
  }

  _createClass(AbstractHandler, [{
    key: 'exec',
    value: function exec(data) {
      var _this = this;

      debug('Exec handler %o...', this.constructor.name);
      return new _bluebird2.default(function (resolve) {
        return resolve(_this.handle(data));
      }).then(function (result) {
        var dataAltered = {};
        (0, _lodash.forEach)(result, function (value, key) {
          dataAltered[(0, _envFileHelpers.removeNamePrefix)(key)] = value;
        });

        debug('Exec handler %o...Success!', _this.constructor.name);

        return dataAltered;
      });
    }
  }, {
    key: 'getOrder',
    value: function getOrder() {
      return 10;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      return '/' + this.projectName + '/' + this.getType() + '/' + this.getName();
    }
  }]);

  return AbstractHandler;
}();

exports.default = AbstractHandler;
//# sourceMappingURL=AbstractHandler.js.map