import debugPkg from 'debug';
import { forEach } from 'lodash';
import { removeNamePrefix } from './helpers/envFileHelpers';

const debug = debugPkg('credstash-to-envs');

class AbstractHandler {
  constructor(program, credstash, projectName) {
    this.program = program;
    this.credstash = credstash;
    this.projectName = projectName;
  }

  exec(data) {
    debug('Exec handler %o...', this.constructor.name);
    return new Promise(resolve => resolve(this.handle(data)))
      .then((result) => {
        const dataAltered = {};
        forEach(result, (value, key) => {
          dataAltered[removeNamePrefix(key)] = value;
        });

        debug('Exec handler %o...Success!', this.constructor.name);

        return dataAltered;
      });
  }

  handle() {
    throw new Error('Must be implemented');
  }

  getOrder() {
    return 10;
  }

  getPath() {
    return `/${this.projectName}/${this.getType()}/${this.getName()}`;
  }
}

export default AbstractHandler;
