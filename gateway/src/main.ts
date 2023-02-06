import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createProxyMiddleware} from 'http-proxy-middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ExtractJwt } from 'passport-jwt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const service: JwtService = app.select(AuthModule).get(JwtService)

  app.use(
    '/api/video', 
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {'^/api/video' : '/'},
      onProxyReq: (proxyReq, req, res, options) => {
        try {
          const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
          const payload = service.verify(token)
          proxyReq.setHeader('X-id', payload.sub)
        } catch (err) {
          res.status(403).json({ message: 'Unauthorized!' })
          return
        }
      }
    })
  )

  await app.listen(3000)
}
bootstrap();
