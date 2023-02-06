import { Injectable } from '@nestjs/common';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(@InjectRepository(History) private historyRepository: Repository<History>) {

  }

  async createHistory(payload) {
    const newHistory = this.historyRepository.create({
      user: {id: payload.userId},
      video: {id: payload.videoId},
      progress: payload.progress,
      hasWatched: payload.progress >= 0.98
    })

    return this.historyRepository.save(newHistory)
  }

  async updateProgress(payload) {
    const history = await this.historyRepository.findOneBy({
      user: {id: payload.userId},
      video: {id: payload.videoId},
    })

    if (history == null) {
      return this.createHistory(payload)
    }

    history.progress = payload.progress
    history.hasWatched = history.hasWatched || payload.progress >= 0.98
    return this.historyRepository.save(history)
  }

  async getWatchedVideos(id) {
    return this.historyRepository.find({
      where: {
        user: {id: id},
        hasWatched: true
      },
      relations: {
        video: true
      }
    })
    .then(res => {
      return res.reduce((prev, curr) => {
        prev.push(curr.video)
        return prev
      }, [])
    })
  }
}
