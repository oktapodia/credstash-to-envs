/* eslint-disable */
import debugPkg from 'debug';
import prompt from 'co-prompt';
import { getHandlers, sortHandlers } from './helpers/handlerHelpers';
import { assign, map } from 'lodash';
import program from 'commander';
import co from 'co';
import { isEnvFileExists, writeEnvFile } from './helpers/envFileHelpers';

const defaultConfig = {
  handlersDir: './handlers',
  region: 'eu-west-1',
  table: 'credential-store',
  projectName: 'credstash-to-env',
};

export default class CredstashToEnv {
  constructor(config = {}) {
    this.config = assign(defaultConfig, config);
  }

  async execute() {
    const debug = debugPkg('credstash-to-env');

    debug('Configure credstash...');
    const Credstash = require('nodecredstash');
    const credstash = new Credstash({ table: this.config.table, awsOpts: { region: this.config.region } });

    debug('Init commanderjs...');

    program
      .version('0.1.0');

    debug('Register handlers...');
    const handlers = map(getHandlers(this.config.handlersDir), (Handler) => {
      const h = new Handler.default(program, credstash, this.config.projectName);
      if (h.option) {
        h.option();
      }

      return h;
    });
    program.parse(process.argv);

    debug('Sort handlers...');
    handlers.sort(sortHandlers);

    co(function* main() {
      if (isEnvFileExists()) {
        const overwrite = yield prompt.confirm('The file already exists, would you like to overwrite it? [y/n]');

        if (!overwrite) {
          debug('Do not overwrite the file');

          process.exit();
          return;
        }
      }

      (async function handleAndWrite() {
        let params = {};
        for (const handler of handlers) {
          params = assign({}, await handler.exec(params));
        }

        await writeEnvFile(params);
        process.exit();
      })();
    });

  }
}
