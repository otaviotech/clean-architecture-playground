import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { HttpController, HttpRequest, HttpResponse } from '@infra/ports';
import {
  buildApplicationErrorResponse,
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';
import { GetFollowStatusPresenter } from '@infra/web/presenters/getFollowStatus';

// Application
import { IGetFollowStatusUseCase } from '@application/ports/usecases';
import { GetFollowStatusInputBuilder } from '@application/usecases';

@singleton()
export class GetFollowStatusController implements HttpController {
  private readonly inputValidator = new GetFollowStatusInputBuilder();
  private readonly presenter = new GetFollowStatusPresenter();

  constructor(
    @inject('IGetFollowStatusUseCase')
    private readonly getFollowStatusUseCase: IGetFollowStatusUseCase
  ) {}

  async handle(input: HttpRequest): Promise<HttpResponse> {
    const inputOrError = this.inputValidator.build(input.query as never);

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
