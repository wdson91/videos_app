/* eslint-disable prettier/prettier */
import CreateUserDto from '../dto/create-user.dto';
import { PrismaService } from './../../prisma.service';
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserEntity {

    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

    async createUser(createUserDto: CreateUserDto) {

        const existingUser = await this.findByEmail(createUserDto.email);
        if (existingUser) {

            throw new Error('Este email já está em uso.');
        }

        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                }
            });

            return user

        } catch (error) {

            throw new Error('Erro ao criar usuário.');


        }

    }

    async updateUser(id: string, updateUserDto: CreateUserDto) {


        const existingUser = await this.findOne(id);

        if (!existingUser) {

            throw new Error('Usuário não encontrado.');
        }

        try {

            const user = await this.prismaService.user.update({
                where: {
                    id: id
                },
                data: {
                    ...updateUserDto
                }
            });

            return { 'Usuário atualizado com sucesso': user }

        } catch (error) {

            throw new Error('Erro ao atualizar usuário.');

        }

    }

    async findOne(id: string) {

        try {

            const user = await this.prismaService.user.findUnique({
                where: {
                    id: id
                }
            });

            if (!user) {

                throw new Error('Usuário não encontrado.');
            }

            return user

        } catch (error) {

            throw new Error('Erro ao encontrar usuário.');

        }
    }

    async findByEmail(email: string) {

        try {

            const user = await this.prismaService.user.findUnique({
                where: {
                    email: email
                }
            });

            // if (!user) {

            //     throw new Error('Usuário não encontrado.');
            // }

            return user || null

        } catch (error) {

            throw new Error('Erro ao encontrar usuário.');

        }

    }
}
