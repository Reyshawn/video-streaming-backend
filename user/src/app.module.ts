import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { User } from './entities/user.entity';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([
      User,
      Video,
      History
    ])
  ],
  controllers: [AppController],
  providers: [AppService, VideoService, HistoryService],
})
export class AppModule {}
