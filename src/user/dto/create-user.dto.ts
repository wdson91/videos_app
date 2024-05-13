/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDto {
    @IsString()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export default CreateUserDto;
