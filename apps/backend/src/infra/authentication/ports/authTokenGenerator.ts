export type IAuthTokenGeneratorInput = {
  payload: { [key: string]: unknown };
  ttl: string;
  secret: string;
};

export interface IAuthTokenGenerator {
  generate(input: IAuthTokenGeneratorInput): Promise<string>;
}
