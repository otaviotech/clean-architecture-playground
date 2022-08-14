import { inject, singleton } from 'tsyringe';
import {
  IComparePasswordHashService,
  ComparePasswordHashServiceInput,
} from '@application/ports/services';

import { IHashComparer } from '@infra/cryptography/ports';

@singleton()
export class ComparePasswordHashService implements IComparePasswordHashService {
  constructor(
    @inject('IHashComparer') private readonly hashComparer: IHashComparer
  ) {}

  async execute(input: ComparePasswordHashServiceInput): Promise<boolean> {
    return this.hashComparer.compare(input.plain, input.hashed);
  }
}
