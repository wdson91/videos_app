/* eslint-disable prettier/prettier */
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(AuthGuard)
  @Get()
  getHello(@Request() request): string {
    const id = request.id;
    return id;
    return this.appService.getHello();
  }
}
