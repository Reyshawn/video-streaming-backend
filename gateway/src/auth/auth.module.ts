import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,

    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
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
    ]),

    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN')
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
