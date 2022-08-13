import {
  IComparePasswordHashService,
  ComparePasswordHashServiceInput,
} from '@application/ports/services';

import { IHashComparer } from '@infra/cryptography/ports';

export class ComparePasswordHashService implements IComparePasswordHashService {
  constructor(private readonly hashComparer: IHashComparer) {}

  async execute(input: ComparePasswordHashServiceInput): Promise<boolean> {
    return this.hashComparer.compare(input.plain, input.hashed);
  }
}
