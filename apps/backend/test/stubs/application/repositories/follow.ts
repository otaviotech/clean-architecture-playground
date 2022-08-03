import { IFollowRepository } from '@application/ports/repositories';

export class FollowRepositoryStub implements IFollowRepository {
  async execute(): Promise<void> {
    return;
  }
}
