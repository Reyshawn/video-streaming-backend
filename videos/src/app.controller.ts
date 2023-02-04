import { Controller, Get, Param, Res, Headers, HttpStatus, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';
import { statSync, createReadStream } from 'fs';
import { IncomingHttpHeaders } from 'http';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('stream/:id')
  async getStreamVideo(@Param('id') id: any, @Headers() headers: IncomingHttpHeaders, @Res() res: Response) {
    const videoPath = `assets/${id}.mp4`
    const { size } = statSync(videoPath)
    const videoRange = headers.range
    if (!videoRange) {
     throw new NotFoundException()
    }
    const CHUNK_SIZE = 10 ** 6 // 1MB

    const parts = videoRange.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = Math.min(start + CHUNK_SIZE, size - 1)

    const contentLength = end - start + 1

    const readStreamfile = createReadStream(videoPath, { start, end, highWaterMark:60 });
    const h = {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4'
    }

    res.writeHead(HttpStatus.PARTIAL_CONTENT, h) //206
    readStreamfile.pipe(res)
  }
}
