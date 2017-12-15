import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import CredstashToEnv from '../CredstashToEnv';

jest.mock('fs');
// jest.mock('nodecredstash');

describe('CredstashToEnv', () => {
  const handlersDir = path.resolve(__dirname, 'fixtures');
  let classToTest = null;

  beforeAll(() => {
    fs.setReadDirSyncData(['a', 'b']);
    classToTest = new CredstashToEnv({ handlersDir });
  });

  describe('constructor()', () => {
    test('have a default configuration', () => {
      const expectedConfig = {
        handlersDir,
        region: 'eu-west-1',
        table: 'credential-store',
        projectName: 'test',
      };
      const credstashToEnv = new CredstashToEnv(expectedConfig);

      expect(credstashToEnv.config).toEqual(expectedConfig);
    });
    test('can change the default configuration', () => {
      const credstashToEnv = new CredstashToEnv({ projectName: 'test' });

      const expectedConfig = {
        handlersDir,
        region: 'eu-west-1',
        table: 'credential-store',
        projectName: 'test',
      };
      expect(credstashToEnv.config).toEqual(expectedConfig);
    });
  });
  describe('configure()', () => {
    test('should have the handler configured', () => {
      for (const handler of classToTest.handlers) {
        expect(handler.program.Command.constructor.name).toEqual(Command.constructor.name);
        expect(!handler.credstash).toBe(false); // TODO: Better test the credstash exists
        expect(handler.projectName).toEqual('credstash-to-envs');
      }
    });
  });
  describe('execute()', () => {}); // TODO: Don't know how to test it yet
});
