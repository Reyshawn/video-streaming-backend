import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDTO } from 'src/dto/register.dto';

import * as crypto from 'crypto'

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
}


@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy){}

  async validateUser(username: string, password: string): Promise<any> {    
    const userObservable = this.userService.send<User, string>({cmd: 'findUser'}, username)

    const user = await firstValueFrom(userObservable)
    if (user && password === user.password) {
      const { password, username, ...rest } = user 
      return rest
    }

    return null
  }

  // async login(user: any) {
  //   const payload = { name: user.name, sub: user.id }
// 
  //   return {
  //     access_token: this.jwtSevice.sign(payload)
  //   }
  // }

  async register(payload: RegisterDTO) {
   try {
      const salt = 'abc';

      payload.password = crypto
        .createHash('sha256')
        .update(payload.password + salt)
        .digest('hex')

      return this.userService.send<any, RegisterDTO>({cmd: 'createUser'}, payload)
    } catch (err) {
      console.log("auth err:::", err)
      throw err
    }
  }
}
