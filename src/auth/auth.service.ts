import CreateUserDto from 'src/user/dto/create-user.dto';
/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async register(createUserDto: CreateUserDto) {


        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        try {
            const createdUser = await this.userService.create({
                ...createUserDto,
                password: hashedPassword,
            });

            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            throw new HttpException(
                'User with that email already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        throw new HttpException(
            'Something went wrong',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
