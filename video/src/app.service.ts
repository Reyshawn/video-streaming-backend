import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy){}

  getHello(): string {
    return 'Hello World! video streaming';
  }

  getUser() {
    return this.client.send({cmd: 'greeting'}, 'lalala')
  }
}
