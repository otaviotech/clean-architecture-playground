import { SignUpUseCaseOutputBoundary } from '@application/ports/usecases';
import { Presenter } from '@infra/ports';

export type SignUpView = {
  username: string;
};

export class SignUpPresenter
  implements Presenter<SignUpUseCaseOutputBoundary, SignUpView>
{
  render(data: SignUpUseCaseOutputBoundary): SignUpView {
    return { username: data.username };
  }
}
