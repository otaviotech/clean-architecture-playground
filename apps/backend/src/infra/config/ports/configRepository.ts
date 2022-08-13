export interface IConfigRepository {
  getSecret(key: string): Promise<string>;
}
