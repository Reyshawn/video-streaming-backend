import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDTO } from 'src/dto/register.dto';
import { hash } from 'src/utils';



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

    if (user && hash(password) === user.password) {
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
      payload.password = hash(payload.password)

      return this.userService.send<any, RegisterDTO>({cmd: 'createUser'}, payload)
    } catch (err) {
      throw err
    }
  }
}
