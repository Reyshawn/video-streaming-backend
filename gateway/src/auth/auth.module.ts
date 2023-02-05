import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options : {
          host: '127.0.0.1',
          port: 8080
        }
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '30d'
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
