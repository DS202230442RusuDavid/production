import Role from "../../roles/role.enum";
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @IsOptional()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    role: Role;

    @IsNotEmpty()
    id: number
  }
   
export default UpdateUserDto;