import Role from "../../roles/role.enum";
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;

    @IsString()
    @IsNotEmpty()
    role: Role;
  }
   
export default CreateUserDto;