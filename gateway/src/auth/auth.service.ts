import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDTO, LoginDTO } from 'src/dto';
import { hash } from 'src/utils';


@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    private jwtSevice: JwtService
  ){}

  async validateUser(username: string, password: string): Promise<any> {    
    const userObservable = this.userService.send<LoginDTO, string>({cmd: 'findUser'}, username)

    const user = await firstValueFrom(userObservable)

    if (user && hash(password) === user.password) {
      const { password, username, ...rest } = user 
      return rest
    }

    return null
  }

  async login(user: LoginDTO) {
    const payload = { name: user.username, sub: user.id }

    return {
      access_token: this.jwtSevice.sign(payload)
    }
  }

  async register(payload: RegisterDTO) {
   try {
      payload.password = hash(payload.password)

      return this.userService.send<any, RegisterDTO>({cmd: 'createUser'}, payload)
    } catch (err) {
      throw err
    }
  }
}
