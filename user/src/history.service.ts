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
      userId: payload.userId,
      videoId: payload.videoId,
      progress: payload.progress
    })

    return this.historyRepository.save(newHistory)
  }

  async updateProgress(payload) {
    const history = await this.historyRepository.findOneBy({
      userId: payload.userId,
      videoId: payload.videoId
    })

    if (history == null) {
      return this.createHistory(payload)
    }

    history.progress = payload.progress
    return this.historyRepository.save(history)
  }
}
