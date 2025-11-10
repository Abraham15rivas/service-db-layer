export class CreateUserDto {
  document: string;
  names: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
}