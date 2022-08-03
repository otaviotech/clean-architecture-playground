import { isLeft } from 'fp-ts/Either';

// Infra (self)
import { HttpController, HttpRequest, HttpResponse } from '@infra/ports';
import {
  buildApplicationErrorResponse,
  buildOkResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';
import { SignUpPresenter } from '@infra/web/presenters/signup';

// Application
import { ISignUpUseCase } from '@application/ports/usecases';
import { SignUpInputBuilder } from '@application/usecases/signup/signupInputBuilder';

export class SignUpController implements HttpController {
  private readonly inputValidator = new SignUpInputBuilder();
  private readonly presenter = new SignUpPresenter();

  constructor(private readonly signUpUseCase: ISignUpUseCase) {}

  async handle(input: HttpRequest): Promise<HttpResponse> {
    const inputOrError = this.inputValidator.build(input.body as never);

    if (isLeft(inputOrError)) {
      return buildValidationFailedResponse(inputOrError.left);
    }

    const result = await this.signUpUseCase.execute(inputOrError.right);

    if (isLeft(result)) {
      return buildApplicationErrorResponse(result.left);
    }

    return buildOkResponse(this.presenter.render(result.right));
  }
}
