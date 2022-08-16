import { singleton } from 'tsyringe';
import dotenv from 'dotenv';

import { IConfigRepository } from '@infra/config/ports/configRepository';

@singleton()
export class DotenvConfigRepository implements IConfigRepository {
  private env: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.env = process.env;
  }

  async getSecret(key: string): Promise<string> {
    return this.env[key] ?? '';
  }
}
