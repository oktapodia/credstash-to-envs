'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortHandlers = undefined;
exports.getHandlers = getHandlers;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHandlers(handlersDir) {
  var handlers = [];

  var files = _fs2.default.readdirSync(handlersDir);

  (0, _lodash.forEach)(files, function (handler) {
    // eslint-disable-next-line
    handlers.push(require(_path2.default.resolve(handlersDir, handler)));
  });

  return handlers;
}

var sortHandlers = exports.sortHandlers = function sortHandlers(a, b) {
  return a.getOrder() - b.getOrder();
};
//# sourceMappingURL=handlerHelpers.js.map