import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${path.resolve(process.cwd(), '..')}/.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),

    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            name: 'USER_SERVICE',
            transport: Transport.TCP,
            options : {
              host: configService.get('USER_SERVICE_HOST'),
              port: Number(configService.get('USER_SERVICE_PORT'))
            }
          }
        },
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
