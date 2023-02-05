import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'greeting'})
  getGreetingMessage(name: string): string {
    return `Hello ${name}`;
  }

  @MessagePattern({cmd: 'findUser'})
  findOne(name: string) {
    return {name: 'kiki', password: '12345', username: 'asd'};
  }
}
