import { SignInUseCaseOutputBoundary } from '@application/ports/usecases';
import { Presenter } from '@infra/ports';

export type SignInView = {
  authToken: string;
};

export class SignInPresenter
  implements Presenter<SignInUseCaseOutputBoundary, SignInView>
{
  render(data: SignInUseCaseOutputBoundary): SignInView {
    return { authToken: data.authToken };
  }
}
