import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'findUser'})
  findUser(username: string) {
    return this.appService.findUser(username)
  }


  @MessagePattern({cmd: 'createUser'})
  createUser(@Payload() payload) {
    try {
      return this.appService.createUser(payload.username, payload.password)
    } catch (err) {
      throw err
    }
  }
}
