import pino from 'pino';
import { Logger } from '@infra/ports';

const prettyLog = process.env.PRETTY_LOGS === 'true';

export class PinoLogger implements Logger {
  public logger = pino({
    transport: prettyLog ? { target: 'pino-pretty' } : undefined,
  });

  error(error: string | Error, ...args: unknown[]): void {
    if (error instanceof Error) {
      this.logger.error(error, error.message, ...args);
      return;
    }

    this.logger.error(error, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }
}
