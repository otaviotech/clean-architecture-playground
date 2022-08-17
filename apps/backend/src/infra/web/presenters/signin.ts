import { singleton } from 'tsyringe';
import { SignInUseCaseOutputBoundary } from '@application/ports/usecases';
import { Presenter } from '@infra/ports';

export type SignInView = {
  authToken: string;
};

@singleton()
export class SignInPresenter
  implements Presenter<SignInUseCaseOutputBoundary, SignInView>
{
  render(data: SignInUseCaseOutputBoundary): SignInView {
    return { authToken: data.authToken };
  }
}
