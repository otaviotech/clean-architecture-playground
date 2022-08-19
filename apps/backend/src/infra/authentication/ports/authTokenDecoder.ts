export interface IAuthTokenDecoder {
  decode(
    token: string,
    secret: string
  ): Promise<{ [key: string]: number | string | null }>;
}
