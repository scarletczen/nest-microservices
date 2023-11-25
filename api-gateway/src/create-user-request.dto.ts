interface User {
  email: string;
  password: string;
}

export class CreateUserRequest implements User {
  public email: string;
  public password: string;
}
