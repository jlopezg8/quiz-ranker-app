export class InvalidCredentialsError extends Error {
  constructor() {
    super();
    this.name = 'InvalidCredentialsError';
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(username: string) {
    super(`an user with the username "${username}" already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}
