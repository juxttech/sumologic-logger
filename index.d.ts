declare class Logger {
  constructor(url: string);

  info(message: any): VoidFunction
  warn(message: any): VoidFunction
  error(message: any): VoidFunction
}

export { Logger };
