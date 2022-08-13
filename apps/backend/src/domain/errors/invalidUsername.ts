export class InvalidUsernameError extends Error {
  data: {
    username: string;
  };

  constructor(username: string) {
    super(`username ${username} is invalid`);
    this.name = 'InvalidUsernameError';
    this.data = { username };
  }
}
