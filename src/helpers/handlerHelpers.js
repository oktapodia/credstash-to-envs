import fs from 'fs';
import path from 'path';
import { forEach } from 'lodash';

export function getHandlers(handlersDir) {
  const handlers = [];

  const files = fs.readdirSync(handlersDir);

  forEach(files, (handler) => {
    // eslint-disable-next-line
    handlers.push(require(path.resolve(handlersDir, handler)));
  });

  return handlers;
}

export const sortHandlers = (a, b) => a.getOrder() - b.getOrder();
