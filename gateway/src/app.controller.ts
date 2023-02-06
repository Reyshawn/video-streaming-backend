import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RegisterDTO } from './dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUserInfo(@Request() req: any) {
    return this.appService.getCurrentUser(req.user.name)
  }

  @UseGuards(JwtAuthGuard)
  @Get('videos')
  getAllVideos() {
    return this.appService.getAllVideos()
  }

  @UseGuards(JwtAuthGuard)
  @Post('history')
  updateHistory(@Body() body) {
    return this.appService.updateHistory(body)
  }
}
