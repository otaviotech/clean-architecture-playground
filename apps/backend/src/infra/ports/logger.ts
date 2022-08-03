export interface Logger {
  info(message: string, ...args: unknown[]): void;
  error(error: Error | string, ...args: unknown[]): void;
}
