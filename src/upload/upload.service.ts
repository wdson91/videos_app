/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { GoogleDriveService } from 'nestjs-googledrive-upload';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UploadService {
    constructor(private readonly googleDriveService: GoogleDriveService, private prismaService: PrismaService,@Inject('UPLOAD_SERVICE') private readonly uploadClient: ClientKafka) { }



    public async uploadImage(file: Express.Multer.File, title: string, userId: any): Promise<string> {
        try {
            const url = await this.googleDriveService.uploadImage(file);
            // do something with the link, e.g., save it to the database
            const idVideo = url.split('=')[1];
            const baseUrl = 'https://drive.google.com/file/d/';


            const finalUrl = baseUrl + idVideo + '/preview';

            if (url) {
                const video = await this.prismaService.videos.create({
                    data: {
                        title,
                        url: finalUrl,
                        userId: userId,
                    }
                });
                return video.url;
            }
            this.uploadClient.emit('upload-consumer', { url, title, userId });

        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    public async getImage(fileId: string): Promise<string> {
        try {
            const link = await this.googleDriveService.getImage(fileId);
            // do something with the link, e.g., return it to the user
            return link;
        } catch (e) {
            throw new Error(e);
        }
    }



    public async uploadConsumer(file:any, title:any, userId:any) {
        this.uploadImage(file, title, userId);
        return 'Seu arquivo foi enviado com sucesso!, aguarde o email de confirmação.';
    }
}

