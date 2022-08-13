export type IAuthTokenValidatorInput = {
  authToken: string;
  secret: string;
};

export interface IAuthTokenValidator {
  validate(input: IAuthTokenValidatorInput): Promise<boolean>;
}
