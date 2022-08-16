import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { HttpController, HttpRequest, HttpResponse } from '@infra/web/ports';

// Application
import { IFollowUseCase } from '@application/ports/usecases';
import { FollowInputBuilder } from '@application/usecases/follow/followInputBuilder';

// Infra
import {
  buildApplicationErrorResponse,
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';

@singleton()
export class FollowController implements HttpController {
  private readonly inputValidator = new FollowInputBuilder();

  constructor(
    @inject('IFollowUseCase') private readonly followUseCase: IFollowUseCase
  ) {}

  async handle(input: HttpRequest): Promise<HttpResponse> {
    const inputOrError = this.inputValidator.build(input.query as never);

    if (isLeft(inputOrError)) {
      return buildValidationFailedResponse(inputOrError.left);
    }

    const result = await this.followUseCase.execute(inputOrError.right);

    if (isLeft(result)) {
      return buildApplicationErrorResponse(result.left);
    }

    return buildOkResponse(result.right);
  }
}
