import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RegisterDTO } from './dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() body): any {
    return this.authService.login(body)
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body)
  }
}
