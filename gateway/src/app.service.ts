import { Inject, Injectable, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  async getCurrentUser(username: string) {
    const userObservabel = this.userService.send({cmd: 'findUser'}, username)
    const {password, ...rest} = await firstValueFrom(userObservabel)

    return rest
  }
}
