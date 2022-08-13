export interface IHashComparer {
  compare(plain: string, hashed: string): Promise<boolean>;
}
