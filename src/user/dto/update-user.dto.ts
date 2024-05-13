/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';
import CreateUserDto from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password?: string;
}

