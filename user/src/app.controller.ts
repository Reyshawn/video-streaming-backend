import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VideoService } from './video.service';
import { HistoryService } from './history.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly videoService: VideoService,
    private readonly historyService: HistoryService,
  ) {}

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

  @MessagePattern({cmd: 'uploadVideo'})
  uploadVideo(@Payload() payload) {
    return this.videoService.createVideo(payload)
  }

  @MessagePattern({cmd: 'getVideos'})
  getVideos() {
    return this.videoService.getVideos()
  }

  @MessagePattern({cmd: 'findVideo'})
  findVideo(id: number) {
    return this.videoService.findVideo(id)
  }

  @MessagePattern({cmd: 'updateHistoryProgress'})
  updateHistoryProgress(@Payload() payload) {
    return this.historyService.updateProgress(payload)
  }
}
