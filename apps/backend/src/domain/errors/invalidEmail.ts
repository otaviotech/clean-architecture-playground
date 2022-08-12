export class InvalidEmailError extends Error {
  data: {
    email: string;
  };

  constructor(email: string) {
    super(`email ${email} is invalid`);
    this.name = 'InvalidEmailError';
    this.data = { email };
  }
}
