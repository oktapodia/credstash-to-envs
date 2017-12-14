import fs from 'fs';
import CredstashToEnvs from '../index';

jest.mock('fs');
jest.mock('../../package.json', () => ({ name: 'test' }));

describe('index', () => {
  let classToTest = null;
  beforeAll(() => {
    classToTest = new CredstashToEnvs();
  });
  describe('execute', () => {
    test('return the package.json name', () => {
      console.log(classToTest.execute());
    });
  });
});
