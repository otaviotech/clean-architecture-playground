import { isLeft } from 'fp-ts/Either';

// Infra (self)
import { HttpController, HttpRequest, HttpResponse } from '@infra/ports';
import { buildOkResponse, buildUnauthorizedResponse } from '@infra/web/shared';

// Application
import { ISignInUseCase } from '@application/ports/usecases';
import { SignInPresenter } from '../presenters';

export class SignInController implements HttpController {
  private presenter = new SignInPresenter();

  constructor(private readonly signUpUseCase: ISignInUseCase) {}

  async handle(input: HttpRequest): Promise<HttpResponse> {
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
