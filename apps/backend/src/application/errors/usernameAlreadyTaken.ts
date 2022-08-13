export class UsernameAlreadyTakenError extends Error {
  data: {
    username: string;
  };

  constructor(username: string) {
    super(`username "${username}" already taken`);

    this.name = 'UsernameAlreadyTakenError';
    this.data = { username };
  }
}
