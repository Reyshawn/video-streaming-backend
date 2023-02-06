import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
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
              port: configService.get('USER_SERVICE_PORT')
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
