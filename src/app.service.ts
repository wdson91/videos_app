import { Inject, Injectable } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    @Inject('UPLOAD_SERVICE') private readonly uploadClient: ClientKafka,
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  getHello(): string {
    this.uploadClient.emit('upload-consumer', { id: 'teste' });
    return 'Hello World!';
  }
}
