import {
  IComparePasswordHashService,
  ComparePasswordHashServiceInput,
} from '@application/ports/services';

import { IHashComparer } from '@infra/cryptography/ports/hashComparer';

export class PasswordHashComparer implements IComparePasswordHashService {
  constructor(private readonly hashComparer: IHashComparer) {}

  async execute(input: ComparePasswordHashServiceInput): Promise<boolean> {
    return this.hashComparer.compare(input.plain, input.hashed);
  }
}
