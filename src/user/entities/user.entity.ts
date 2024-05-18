/* eslint-disable prettier/prettier */
import CreateUserDto from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from './../../prisma.service';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
 

@Injectable()
export class UserEntity {


    saltOrRounds = 10;
    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

    async createUser(createUserDto: CreateUserDto) {

        const existingUser = await this.findByEmail(createUserDto.email);

        if (existingUser) {

            throw new ConflictException('Email já cadastrado');
        }

        try {

            const { password } = createUserDto;

            const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
            const user = await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword
                }
            });

            return {message:'Usuário criado com sucesso.'}

        } catch (error) {

            throw new BadRequestException('Erro ao criar usuário.');


        }

    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {

        const existingUser = await this.findOne(id);

        if (!existingUser) {

            throw new ConflictException('Erro ao encontrar usuário.');
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

            return { ...user, password: undefined, createdAt: undefined, updatedAt: undefined }

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

            return user

        } catch (error) {

            throw new ConflictException('Erro ao encontrar usuário.');

        }

    }

    async generateToken(user: { id: string; email: string; name: string; password: string; createdAt: Date; updatedAt: Date; }) {
        const payload = { id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async myVideos(id: any) {

        try {
            const videos = await this.prismaService.videos.findMany({
                where: {
                    userId: id
                }
            });

            return videos;
        }
        catch (error) {
            throw new Error('Erro ao encontrar vídeos.');
        }

    }
}
