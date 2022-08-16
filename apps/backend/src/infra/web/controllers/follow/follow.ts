import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { IHttpController, IHttpRequest, IHttpResponse } from '@infra/web/ports';

// Application
import {
  FollowUseCaseInput,
  IFollowUseCase,
} from '@application/ports/usecases';

// Infra
import {
  buildApplicationErrorResponse,
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';
import { InputBuilder } from '@shared/protocols';

@singleton()
export class FollowController implements IHttpController {
  constructor(
    @inject('IFollowUseCase') private readonly followUseCase: IFollowUseCase,
    @inject('IFollowInputBuilder')
    private readonly inputBuilder: InputBuilder<FollowUseCaseInput>
  ) {}

  async handle(input: IHttpRequest): Promise<IHttpResponse> {
    const inputOrError = this.inputBuilder.build(input.query);

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
