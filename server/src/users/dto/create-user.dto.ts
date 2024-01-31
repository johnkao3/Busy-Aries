export class CreateUserDto {
  username: string;

  password: string;

  isActive: boolean = true;

  legalName: string;

  nickName: string;

  role: string;
}
