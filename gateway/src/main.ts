import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createProxyMiddleware} from 'http-proxy-middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const jwtService: JwtService = app.select(AuthModule).get(JwtService)
  const configService = app.get(ConfigService);

  app.use(
    '/s/video', 
    createProxyMiddleware({
      target: configService.get('VIDEO_SERVICE_URI'),
      changeOrigin: true,
      pathRewrite: {'^/s/video' : ''},
      onProxyReq: (proxyReq, req, res, options) => {
        // ignore the stream calls from the video tag
        if (req.path.startsWith('/stream') && req.headers.range != null) {
          return
        }
        
        try {
          const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
          const payload = jwtService.verify(token)
          proxyReq.setHeader('X-id', payload.sub)
        } catch (err) {
          res.status(403).json({ message: 'Unauthorized!' })
          return
        }
      }
    })
  )

  await app.listen(Number(process.env.PORT) || 3000)
}
bootstrap();
