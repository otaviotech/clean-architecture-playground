import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { IHttpController, IHttpRequest, IHttpResponse } from '@infra/web/ports';
import {
  buildOkResponse,
  buildUnauthorizedResponse,
  buildValidationFailedResponse,
} from '@infra/web/shared';
import { SignInView } from '@infra/web/presenters';
import { Presenter } from '@infra/ports';

// Application
import {
  ISignInUseCase,
  SignInUseCaseInput,
  SignInUseCaseOutputBoundary,
} from '@application/ports/usecases';
import { InputBuilder } from '../../../shared/protocols';

@singleton()
export class SignInController implements IHttpController {
  constructor(
    @inject('ISignInUseCase') private readonly signUpUseCase: ISignInUseCase,
    @inject('ISignInInputBuilder')
    private readonly inputBuilder: InputBuilder<SignInUseCaseInput>,
    @inject('ISignInPresenter')
    private readonly presenter: Presenter<
      SignInUseCaseOutputBoundary,
      SignInView
    >
  ) {}

  async handle(input: IHttpRequest): Promise<IHttpResponse> {
    const ucInput = this.inputBuilder.build(input.body);

    if (isLeft(ucInput)) {
      return buildValidationFailedResponse(ucInput.left);
    }

    const result = await this.signUpUseCase.execute(ucInput.right);

    if (isLeft(result)) {
      return buildUnauthorizedResponse([result.left]);
    }

    return buildOkResponse(this.presenter.render(result.right));
  }
}
