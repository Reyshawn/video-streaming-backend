import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { User } from './entities/user.entity';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepository: Repository<Video>) {

  }

  async createVideo(payload)  {
    const newVideo = this.videoRepository.create({
      name: payload.name,
      mimetype: payload.mimetype,
      size: payload.size,
      owner: {id: payload.userId},
      url: payload.url,
      notes: ''
    })

    return this.videoRepository.save(newVideo)
  }
}
