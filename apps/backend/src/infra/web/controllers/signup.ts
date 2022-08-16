import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { IHttpController, IHttpRequest, IHttpResponse } from '@infra/web/ports';
import {
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';
import { SignUpPresenter } from '@infra/web/presenters/signup';

// Application
import { ISignUpUseCase } from '@application/ports/usecases';
import { SignUpInputBuilder } from '@application/usecases/signup/signupInputBuilder';

@singleton()
export class SignUpController implements IHttpController {
  private readonly inputValidator = new SignUpInputBuilder();
  private readonly presenter = new SignUpPresenter();

  constructor(
    @inject('ISignUpUseCase') private readonly signUpUseCase: ISignUpUseCase
  ) {}

  async handle(input: IHttpRequest): Promise<IHttpResponse> {
    const inputOrError = this.inputValidator.build(input.body as never);

    if (isLeft(inputOrError)) {
      return buildValidationFailedResponse(inputOrError.left);
    }

    const result = await this.signUpUseCase.execute(inputOrError.right);

    if (isLeft(result)) {
      return buildValidationFailedResponse([result.left]);
    }

    return buildOkResponse(this.presenter.render(result.right));
  }
}
