import { singleton } from 'tsyringe';

import { GetFollowStatusUseCaseOutputBoundary } from '@application/ports/usecases';

import { Presenter } from '@infra/ports';

export type GetFollowStatusView = {
  isFollowing: boolean;
  isFollowed: boolean;
};

@singleton()
export class GetFollowStatusPresenter
  implements
    Presenter<GetFollowStatusUseCaseOutputBoundary, GetFollowStatusView>
{
  render(data: GetFollowStatusUseCaseOutputBoundary): GetFollowStatusView {
    return { isFollowed: data.isFollowed, isFollowing: data.isFollowing };
  }
}
