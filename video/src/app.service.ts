import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateVideoDTO } from './dto';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy){}

  getHello(): string {
    return 'Hello World! video streaming';
  }

  createVideo(payload: CreateVideoDTO) {
    return this.userService.send({cmd: 'uploadVideo'}, payload)
  }
}
