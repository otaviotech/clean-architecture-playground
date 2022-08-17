import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { IHttpController, IHttpRequest, IHttpResponse } from '@infra/web/ports';
import { Presenter } from '@infra/ports';
import {
  buildApplicationErrorResponse,
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';
import { GetFollowStatusView } from '@infra/web/presenters/getFollowStatus';

// Application
import {
  GetFollowStatusUseCaseInput,
  GetFollowStatusUseCaseOutputBoundary,
  IGetFollowStatusUseCase,
} from '@application/ports/usecases';

// Shared
import { InputBuilder } from '@shared/protocols';

@singleton()
export class GetFollowStatusController implements IHttpController {
  constructor(
    @inject('IGetFollowStatusUseCase')
    private readonly getFollowStatusUseCase: IGetFollowStatusUseCase,
    @inject('IGetFollowStatusInputBuilder')
    private readonly inputBuilder: InputBuilder<GetFollowStatusUseCaseInput>,
    @inject('IGetFollowStatusPresenter')
    private readonly presenter: Presenter<
      GetFollowStatusUseCaseOutputBoundary,
      GetFollowStatusView
    >
  ) {}

  async handle(input: IHttpRequest): Promise<IHttpResponse> {
    const inputOrError = this.inputBuilder.build(input.query as never);

    if (isLeft(inputOrError)) {
      return buildValidationFailedResponse(inputOrError.left);
    }

    const result = await this.getFollowStatusUseCase.execute(
      inputOrError.right
    );

    if (isLeft(result)) {
      return buildApplicationErrorResponse(result.left);
    }

    return buildOkResponse(this.presenter.render(result.right));
  }
}
