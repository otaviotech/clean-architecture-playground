export interface ILogger {
  logger?: any;
  info(message: string, ...args: unknown[]): void;
  error(error: Error | string, ...args: unknown[]): void;
}
