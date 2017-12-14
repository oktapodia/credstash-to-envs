import fs from 'fs';
import { isEnvFileExists, removeNamePrefix, convertObjectToPlainData, writeEnvFile } from '../helpers/envFileHelpers';

jest.mock('fs');

describe('envFileHelpers', () => {
  describe('isEnvFileExists', () => {
    test('return true if the file exists', () => {
      fs.setExistsStatus(true);
      expect(isEnvFileExists()).toBe(true);
    });
    test('return false if the file does not exists', () => {
      fs.setExistsStatus(false);
      expect(isEnvFileExists()).toBe(false);
    });
  });
  describe('removeNamePrefix', () => {
    test('return the name without the prefix without leading slash', () => {
      expect(removeNamePrefix('first')).toBe('first');
    });
    test('return the name without the prefix with 1 segment', () => {
      expect(removeNamePrefix('/first')).toBe('first');
    });
    test('return the name without the prefix with 2 segments', () => {
      expect(removeNamePrefix('/first/second')).toBe('second');
    });
  });
  describe('convertObjectToPlainData', () => {
    test('convert an object to plain data', () => {
      expect(convertObjectToPlainData({ foo: 'test', bar: 'test2' })).toBe('foo=test\nbar=test2\n');
    });
  });
  describe('writeEnvFile', () => {
    test('write file with success', () => {
      expect(writeEnvFile({ foo: 'test', bar: 'test2' })).resolves.toBe(undefined);
    });
    test('write file with error', () => {
      expect(writeEnvFile({ status: 'error', bar: 'test2' })).rejects.toEqual({
        error: 'An error occured',
      });
    });
  });
});
