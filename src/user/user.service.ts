/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import CreateUserDto from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class UserService {

  constructor(private userentity: UserEntity) { }
  saltOrRounds = 10;

  async create(createUserDto: CreateUserDto) {

    return await this.userentity.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userentity.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userentity.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userentity.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida.');
    }

    return await this.userentity.generateToken(user);
  }

  async myVideos(id: any) {

    return await this.userentity.myVideos(id);
  }


}
