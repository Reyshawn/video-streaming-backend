import { Controller, Get, Param, Res, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('stream/:id')
  async getStreamVideo(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {

    return {id: id}
  }
}
