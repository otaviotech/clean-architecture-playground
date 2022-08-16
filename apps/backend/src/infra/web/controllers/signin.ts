import { isLeft } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';

// Infra (self)
import { IHttpController, IHttpRequest, IHttpResponse } from '@infra/web/ports';
import { buildOkResponse, buildUnauthorizedResponse } from '@infra/web/shared';

// Application
import { ISignInUseCase } from '@application/ports/usecases';
import { SignInPresenter } from '@infra/web/presenters';

@singleton()
export class SignInController implements IHttpController {
  private presenter = new SignInPresenter();

  constructor(
    @inject('ISignInUseCase') private readonly signUpUseCase: ISignInUseCase
  ) {}

  async handle(input: IHttpRequest): Promise<IHttpResponse> {
    const { username, password } = (input.body as never) ?? {};

    const result = await this.signUpUseCase.execute({
      username,
      password,
    });

    if (isLeft(result)) {
      return buildUnauthorizedResponse([result.left]);
    }

    return buildOkResponse(this.presenter.render(result.right));
  }
}
