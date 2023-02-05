import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

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
    PassportModule
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
