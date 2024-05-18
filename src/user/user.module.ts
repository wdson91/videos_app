/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'UPLOAD_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {

          brokers: ['kafka:29092'],
        },
        consumer: {
          groupId: 'upload-consumer',
        },
      },
    }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserEntity, PrismaService],
})
export class UserModule { }
