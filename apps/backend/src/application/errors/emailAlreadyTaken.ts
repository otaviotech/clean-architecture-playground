export class EmailAlreadyTakenError extends Error {
  data: {
    email: string;
  };

  constructor(email: string) {
    super(`Email "${email}" already taken`);

    this.name = 'EmailAlreadyTakenError';
    this.data = { email };
  }
}
