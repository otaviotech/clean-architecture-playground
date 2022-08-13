import { IHashPasswordService } from '@application/ports/services';
import { IHasher } from '@infra/cryptography/ports';

export class Hasher implements IHashPasswordService {
  constructor(private readonly hasher: IHasher) {}

  execute(input: string): Promise<string> {
    return this.hasher.hash(input);
  }
}
