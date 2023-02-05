import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


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
    console.log("user:::", user)
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
}
