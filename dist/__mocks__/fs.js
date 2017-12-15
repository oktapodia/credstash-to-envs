'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fs = {
  status: false,
  writtenData: null,
  writeFile: function writeFile(file, data) {
    if (data.match(/(status=error)/i)) {
      // eslint-disable-next-line no-throw-literal
      throw { error: 'An error occured' };
    }

    this.writtenData = data;
  },
  existsSync: function existsSync() {
    return this.status;
  },
  setExistsStatus: function setExistsStatus(status) {
    this.status = status;
  },
  readdirSync: function readdirSync() {
    return this.readDirSyncData;
  },
  setReadDirSyncData: function setReadDirSyncData(readDirSyncData) {
    this.readDirSyncData = readDirSyncData;
  }
};

exports.default = fs;
//# sourceMappingURL=fs.js.map