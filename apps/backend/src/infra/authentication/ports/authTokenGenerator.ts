export type IAuthTokenGeneratorInput = {
  payload: { [key: string]: unknown };
  secret: string;
};

export interface IAuthTokenGenerator {
  generate(input: IAuthTokenGeneratorInput): Promise<string>;
}
