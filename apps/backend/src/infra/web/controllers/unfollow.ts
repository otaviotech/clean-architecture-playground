import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { HttpController, HttpRequest, HttpResponse } from '@infra/ports';
import {
  buildApplicationErrorResponse,
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';

// Application
import { IUnfollowUseCase } from '@application/ports/usecases';
import { UnfollowInputBuilder } from '@application/usecases/unfollow/unfollowInputBuilder';

@singleton()
export class UnfollowController implements HttpController {
  private readonly inputValidator = new UnfollowInputBuilder();

  constructor(
    @inject('IUnfollowUseCase')
    private readonly unfollowUseCase: IUnfollowUseCase
  ) {}

  async handle(input: HttpRequest): Promise<HttpResponse> {
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
