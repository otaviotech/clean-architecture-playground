import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { IHttpController, IHttpRequest, IHttpResponse } from '@infra/web/ports';
import {
  buildApplicationErrorResponse,
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';

// Application
import { IUnfollowUseCase } from '@application/ports/usecases';
import { UnfollowInputBuilder } from '@application/usecases/unfollow/unfollowInputBuilder';

@singleton()
export class UnfollowController implements IHttpController {
  private readonly inputValidator = new UnfollowInputBuilder();

  constructor(
    @inject('IUnfollowUseCase')
    private readonly unfollowUseCase: IUnfollowUseCase
  ) {}

  async handle(input: IHttpRequest): Promise<IHttpResponse> {
    const inputOrError = this.inputValidator.build(input.body as never);

    if (isLeft(inputOrError)) {
      return buildValidationFailedResponse(inputOrError.left);
    }

    const result = await this.unfollowUseCase.execute(inputOrError.right);

    if (isLeft(result)) {
      return buildApplicationErrorResponse(result.left);
    }

    return buildOkResponse(result.right);
  }
}
