import fs from 'fs';
import { forEach } from 'lodash';

const envFilePath = '.env';
export function isEnvFileExists() {
  return fs.existsSync(envFilePath);
}

export function convertObjectToPlainData(data) {
  let dataConverted = '';
  forEach(data, (value, name) => {
    dataConverted += `${name}=${value}\n`;
  });

  return dataConverted;
}

export async function writeEnvFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(envFilePath, convertObjectToPlainData(data), (err) => {
      if (err) {
        return reject(err);
      }
      // eslint-disable-next-line
      console.log('file written successfully');

      return resolve();
    });
  });
}

export function removeNamePrefix(name) {
  const splittedName = name.split('/');
  return splittedName[splittedName.length - 1];
}
