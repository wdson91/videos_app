/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export default CreateUserDto;
