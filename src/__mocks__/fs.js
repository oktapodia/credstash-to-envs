const fs = {
  status: false,
  writeFile: (file, data) => {
    if (data.match(/(status=error)/i)) {
      // eslint-disable-next-line no-throw-literal
      throw { error: 'An error occured' };
    }
  },
  existsSync() {
    return this.status;
  },
  setExistsStatus(status) {
    this.status = status;
  },
  readdirSync() {
    return this.readDirSyncData;
  },
  setReadDirSyncData(readDirSyncData) {
    this.readDirSyncData = readDirSyncData;
  },
};

export default fs;
