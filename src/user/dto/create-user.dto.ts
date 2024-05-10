/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsEmpty } from 'class-validator';

class CreateUserDto {
    @IsString()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsString()
    @IsEmpty()
    name: string;

    @IsString()
    @IsEmpty()
    password: string;
}

export default CreateUserDto;
