import {
  GetFollowStatusUseCaseOutput,
  IGetFollowStatusUseCase,
} from '@application/ports/usecases';
import { right } from 'fp-ts/Either';

export class GetFollowStatusUseCaseStub implements IGetFollowStatusUseCase {
  async execute(): Promise<GetFollowStatusUseCaseOutput> {
    return right({ isFollowed: true, isFollowing: true });
  }
}
