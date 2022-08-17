import NodeEnvironment from 'jest-environment-node';
import util from 'util';
import * as childProcess from 'child_process';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ProjectConfig } from '@jest/types/build/Config';

const prismaClient = new PrismaClient();

const exec = util.promisify(childProcess.exec);

const prismaBinary = './node_modules/.bin/prisma2';

class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: ProjectConfig) {
    super(config);
    this.schema = `test_${randomUUID()}`;
    this.connectionString = process.env.DATABASE_URL.replace(
      'schema=public',
      `schema=${this.schema}`
    );
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await exec(
      `${prismaBinary} migrate reset --force --schema=apps/backend/src/external/database/postgres/prisma/schema.prisma`
    );

    return super.setup();
  }

  async teardown() {
    await prismaClient.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE;`
    );

    await prismaClient.$disconnect();
  }
}

export default PrismaTestEnvironment;
