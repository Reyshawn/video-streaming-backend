import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission, User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

  }

  async findUser(username: string): Promise<User>  {
    try {
      const user = await this.usersRepository.findOneByOrFail({ 
        username: username
      }) 

      return user
    } catch (err) {
      throw err
    }
  }

  async createUser(username: string, password: string)  {
    const user = await this.usersRepository.findBy({ 
      username: username
    })

    if (user.length > 0) {
      // TODO Unify exception
      return {message: 'the user has been existed'}
    }

    const newUser = this.usersRepository.create({
      username,
      password,
      role: Permission.normal
    })

    return this.usersRepository.save(newUser)
  }

  async updateUser(id: number, username: string, password: string): Promise<User>  {
    const user = await this.usersRepository.findOneBy({
      id
    })

    user.username = username
    user.password = password
    return this.usersRepository.save(user)
  }

  async deleteUser(id: number): Promise<User>  {
    const user = await this.usersRepository.findOneBy({
      id
    })

    return this.usersRepository.remove(user)
  }
}
