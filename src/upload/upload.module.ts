import { PrismaService } from './../prisma.service';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {
    GoogleDriveModule,
    GoogleDriveConfig,
} from 'nestjs-googledrive-upload';
import { FilesController } from './files.controller';
import { UploadService } from './upload.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'UPLOAD_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {

                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'upload-consumer',

                },
            },
        }]),
        GoogleDriveModule.register(
            {
                type: "service_account",
                project_id: "divine-quest-417313",
                private_key_id: "6af103438c28f0e515a6822ab297c8f391732138",
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeZUsCi0hR3QVH\nnuiZdXzbxG87o6wEqEJyGTNemmgGu0OAlRaVmGtFnUBcnYSxKGgVDUkurcJNBnz5\noodKhmboc0upmCEe66RLv/IiTk1OSyDoplQCaou9eH+QvcWKD8QhTIz6RcxyXcvD\n4ysJHW62npYFF87PAY1U4mhLyUltZXIujwQDvVww4cDv4BjCnF4cNYQhEwyO3F+M\nzWq3FfXXqpKM2Qu1hfkqC3/DRoRIPZLu29p4REXq2UuWtqaASy5nr4nCqe/8C69D\n1Tw/kIXQqGwgDAYGN0893jlYoumzeuxbEVsZCtVHzO/JT1UeCn3ZRjDwzO+noCx/\nTUqWqDplAgMBAAECggEAMGI6pn1LSw5blYQaAv5bdHotjCcz3XxUR6wg/+3khuHe\n/cEM1AdqBSrCxUesh70TBhM33pVfO84WkN6vuvkRKEJHw3df7qUGW8k3Onl2rcrP\nM6HTGaXYJ7lOJjWByOmF/LH4gl6d0/WIz75tn+worIoGw2mBV8RemqZKO5Qx5MNT\n0C7uchdOyGR6oZlJBd4nWK/pyGfl4WhDtewwyyTrzRrbQR5zXgO3oDeU/YTh7j1E\nzSO2muqAqi3apSDu8iEEehNdp9K/rrnNg+V8hgf6nJI/iWeYDzVtRFmZAdaJtEr8\nQQlS1iuKDHG1VjaD4ij44GyXJzSNjs781Hj1buJcRQKBgQDaTOD7acufB6wRs1vU\nZQiMsia6dgR9xvPs0nCnuAaYzus7b4qAHC7lmjIL6R4eRPRZbKw5J6mEe4gQ2YuM\nna97fpHDRZp119MnqjwzBkidjFSyrwEelefBCXMTP4E9KwrsQFCPyCTtDaK/e4II\nLwPW04dt3ahQIPIPVgXP6HXcUwKBgQC5wAM+aY7nOVt/dcGTrIB0WKm4KFSrfFe9\nRBa57OrueFauDzShguwFaBbetMfRokMWARYLf0QZApaeW0UcU63JMtpjBa5B5PqL\nPE92T2+RJiZGZMpH9sTQYn6yZqG5fT1DlfGh9CsmiukQHi6QTeNbhJT2xBEWGmyK\n3MJo+KZ3ZwKBgC81ow4cAhIhWZ/2Vuym8ONkf6WhcjU1OnlDxWMwFBUl4o9W/u/X\nqHi1EQ+sWXwYU3OnYdN2dV2WTYW/VkORsmqVo7ZELjQ/+YVBdoVeXYPc3lBKMobH\nynffsEhAWpW84j7XZdTCZuHxKfoZHrTgXgcudcJXxleV2GNiqh0dW6fLAoGAMP+9\n21DtKYGv6Uee8N2oZQiefL3m1/XND1hOxm0A7DdCZlgMgi6PJD35CnaV3272U2+l\n6RKBXDeak9tvt7E7Pr/za/urpCZLET+vln4N6DQwFJGx6pnmATJ6SYVZVBz9dD6x\npw9J8rjiEiZkEhz5xMKMqSu/dh0yVM83WYl+IDECgYEAwcjMqd7l5tbBPtMK8FvY\nGHiz1zqx0HQvdM0X/h+2SMsgWGzwQlnTxWGcHXToevpMky36w/yS/pMP38Le8G5d\nvTFWAl8Pd0LPk1QDSnA5XiaFWBMuH0W4F7m3Lb2aCiOzQdBYbHZ+BaZ6FYEZ5XDP\nHS0NiFJG56ixN8hUCvAOR8Y=\n-----END PRIVATE KEY-----\n",
                client_email: "uploaddrive@divine-quest-417313.iam.gserviceaccount.com",
                client_id: "109368682060876791745",
                auth_uri: "https://accounts.google.com/o/oauth2/auth",
                token_uri: "https://oauth2.googleapis.com/token",
                auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/uploaddrive%40divine-quest-417313.iam.gserviceaccount.com",
                universe_domain: "googleapis.com"
            } as GoogleDriveConfig,
            '1-is8j--EYB4WpDNhNigRNHLikOqg7JZk',
        ),
        // other modules...
    ],
    controllers: [FilesController],
    providers: [UploadService, PrismaService],
})
export class UploadModule { }
