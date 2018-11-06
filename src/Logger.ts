import chalk from 'chalk';
import isomorphicFetch from 'isomorphic-fetch';

const { cyan, red, yellow } = chalk;

export const parseMessage = (message: any, type: 'info' | 'warn' | 'error') => JSON.stringify(
  typeof message === 'string' ? { message, type }  : { ...message, type });

export const postLog = async (url: string, message: string) => {
  return isomorphicFetch(url, {
    method: 'POST',
    body: message,
  });
};

class Logger {
  endpoint: string;
  constructor(url: string) {
    this.endpoint = url;
  }

  public info(message: any) {
    const parsedMessage = parseMessage(message, 'info');
    console.info(cyan(parsedMessage));
    postLog(this.endpoint, parsedMessage);
  }

  public warn(message: any) {
    const parsedMessage = parseMessage(message, 'warn');
    console.warn(yellow(parsedMessage));
    postLog(this.endpoint, parsedMessage);
  }

  public error(message: any) {
    const parsedMessage = parseMessage(message, 'error');
    console.error(red(parsedMessage));
    postLog(this.endpoint, parsedMessage);
  }
}

export default Logger;
