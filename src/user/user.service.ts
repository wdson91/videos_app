import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import CreateUserDto from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userentity: UserEntity) { }
  saltOrRounds = 10;

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
    const user = await this.userentity.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userentity.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userentity.findOne(email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Senha inválida.');
    }

    return { 'Usuário logado com sucesso': user };
  }
}
