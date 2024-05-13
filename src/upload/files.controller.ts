/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';


import { UploadService } from './upload.service';

@Controller('files')
export class FilesController {
    constructor(private uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('arquivo'))
    async uploadArquivo(
        @UploadedFile() file: Express.Multer.File,

    ) {

        console.log(file);
        return this.uploadService.uploadImage(file);
    }


    @Get(':id')
    async getArquivo(
        @Param('id') id: string,
    ) {
        return await this.uploadService.getImage(id);
    }
}
