/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';
import CreateUserDto from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsNotEmpty()
    password?: string;
}

