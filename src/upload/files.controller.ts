/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
    Body,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';


import { UploadService } from './upload.service';

@Controller('files')
export class FilesController {
    constructor(private uploadService: UploadService) { }

    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('arquivo'))
    async uploadArquivo(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
        @Request() userId: any
    ) {

        //console.log(file, body.titulo, userId.id);
        return this.uploadService.uploadConsumer(file, body.title, userId.id);
    }


    @Get(':id')
    async getArquivo(
        @Param('id') id: string,
    ) {
        return await this.uploadService.getImage(id);
    }
}
