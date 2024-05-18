/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';



@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    }])

    , UserModule, UploadModule, EmailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
