import { AsyncCommand } from '@shared/protocols';

export type IValidateAuthTokenService = AsyncCommand<string, boolean>;
