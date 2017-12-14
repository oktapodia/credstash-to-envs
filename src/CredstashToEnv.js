import debugPkg from 'debug';
import prompt from 'co-prompt';
import { assign, map } from 'lodash';
import program from 'commander';
import Credstash from 'nodecredstash';
import co from 'co';
import { getHandlers, sortHandlers } from './helpers/handlerHelpers';
import { isEnvFileExists, writeEnvFile } from './helpers/envFileHelpers';

const defaultConfig = {
  handlersDir: './handlers',
  region: 'eu-west-1',
  table: 'credential-store',
  projectName: 'credstash-to-env',
};

const debug = debugPkg('credstash-to-env');

export default class CredstashToEnv {
  constructor(config = {}) {
    this.config = assign(defaultConfig, config);
    this.configure();
  }

  configure() {
    debug('Configure credstash...');
    const credstash = new Credstash({ table: this.config.table, awsOpts: { region: this.config.region } });

    debug('Init commanderjs...');
    program
      .version('0.1.0');

    debug('Register handlers...');
    this.handlers = map(getHandlers(this.config.handlersDir), (Handler) => {
      const h = new Handler.default(program, credstash, this.config.projectName);
      if (h.option) {
        h.option();
      }

      return h;
    });

    debug('Sort handlers...');
    this.handlers.sort(sortHandlers);
    program.parse(process.argv);
  }

  async execute() {
    const handlers = this.handlers;
    return co(function* main() {
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
      }());
    });
  }
}
