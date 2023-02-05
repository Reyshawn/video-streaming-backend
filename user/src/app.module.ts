import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { User } from './entities/user.entity';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([
      User,
      Video
    ])
  ],
  controllers: [AppController],
  providers: [AppService, VideoService],
})
export class AppModule {}
