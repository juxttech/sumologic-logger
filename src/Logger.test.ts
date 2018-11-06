import nock from 'nock';

import * as Logger from './Logger';

describe('Logger.ts', () => {
  describe('default', () => {
    test('should run console.info and postLog on .info', () => {
      const infoSpy = jest.spyOn(console, 'info');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo');
      logger.info('foo');

      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo', 'info');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      infoSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });

    test('should run console.warn and postLog on .warn', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo');
      logger.warn('foo');

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo', 'warn');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      warnSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });

    test('should run console.error and postLog on .error', () => {
      const errorSpy = jest.spyOn(console, 'error');
      const parseMessageSpy = jest.spyOn(Logger, 'parseMessage');
      const postLogSpy = jest.spyOn(Logger, 'postLog');
      postLogSpy.mockImplementation(() => undefined);

      const logger = new Logger.default('foo');
      logger.error('foo');

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledTimes(1);
      expect(parseMessageSpy).toHaveBeenCalledWith('foo', 'error');
      expect(postLogSpy).toHaveBeenCalledTimes(1);

      errorSpy.mockRestore();
      parseMessageSpy.mockRestore();
      postLogSpy.mockRestore();
    });
  });

  describe('postLog',  () => {
    test('should return the status of the request', async () => {
      nock('http://foo.com').post('/log').reply(200);

      const status = await Logger.postLog('http://foo.com/log', 'foo')
        .then(res => res.status);

      expect(status).toBe(200);
    });
  });

  describe('parseMessage',  () => {
    test('should return a string if given a string', () => {
      const message = Logger.parseMessage('foo', 'error');

      expect(message).toBe(JSON.stringify({ message: 'foo', type: 'error' }));
    });

    test('should return a string if given an object', () => {
      const message = Logger.parseMessage({ foo: 'bar' }, 'error');

      expect(message).toBe(JSON.stringify({ foo: 'bar', type: 'error' }));
    });
  });
});
