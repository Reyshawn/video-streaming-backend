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

  async getAllVideos() {
    return this.userService.send({cmd: 'getVideos'}, '')
  }

  async updateHistory(payload) {
    return this.userService.send({cmd: 'updateHistoryProgress'}, payload)
  }

  async getWatchedVideos(id) {
    return this.userService.send({cmd: 'getWatchedVideos'}, id)
  }
}
