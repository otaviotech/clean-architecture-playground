import { inject, singleton } from 'tsyringe';
import { IHashPasswordService } from '@application/ports/services';
import { IHasher } from '@infra/cryptography/ports';

@singleton()
export class HashPasswordService implements IHashPasswordService {
  constructor(@inject('IHasher') private readonly hasher: IHasher) {}

  execute(input: string): Promise<string> {
    return this.hasher.hash(input);
  }
}
