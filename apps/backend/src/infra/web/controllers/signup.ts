import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { IHttpController, IHttpRequest, IHttpResponse } from '@infra/web/ports';
import {
  buildCreatedResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';
import { SignUpPresenter } from '@infra/web/presenters/signup';

// Application
import {
  ISignUpUseCase,
  SignUpUseCaseInput,
} from '@application/ports/usecases';
import { InputBuilder } from '@shared/protocols';

@singleton()
export class SignUpController implements IHttpController {
  private readonly presenter = new SignUpPresenter();

  constructor(
    @inject('ISignUpUseCase')
    private readonly signUpUseCase: ISignUpUseCase,
    @inject('ISignUpInputBuilder')
    private readonly inputBuilder: InputBuilder<SignUpUseCaseInput>
  ) {}

  async handle(input: IHttpRequest): Promise<IHttpResponse> {
    const inputOrError = this.inputBuilder.build(input.body as never);

    if (isLeft(inputOrError)) {
      return buildValidationFailedResponse(inputOrError.left);
    }

    const result = await this.signUpUseCase.execute(inputOrError.right);

    if (isLeft(result)) {
      return buildValidationFailedResponse([result.left]);
    }

    return buildCreatedResponse(this.presenter.render(result.right));
  }
}
