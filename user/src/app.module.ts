import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${path.resolve(process.cwd(), '..')}/.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: "mysql",
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          entities: [__dirname + '/../**/*.entity.js'],
          synchronize: true,
          // migrations: [
          //  'dist/src/db/migrations/**/*.js'
          // ]
        }
      },
      inject: [ConfigService]
    }),

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
