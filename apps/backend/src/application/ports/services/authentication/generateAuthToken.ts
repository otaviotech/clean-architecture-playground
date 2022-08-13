import { AsyncCommand } from '@shared/protocols';

export type GenerateAuthTokenServiceInput = {
  payload: { [key: string]: unknown };
};

export type IGenerateAuthTokenService = AsyncCommand<
  GenerateAuthTokenServiceInput,
  string
>;
