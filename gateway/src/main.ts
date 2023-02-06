import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createProxyMiddleware} from 'http-proxy-middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ExtractJwt } from 'passport-jwt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const service: JwtService = app.select(AuthModule).get(JwtService)

  app.use(
    '/s/video', 
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {'^/s/video' : ''},
      onProxyReq: (proxyReq, req, res, options) => {
        // ignore the stream calls from the video tag
        if (req.path.startsWith('/stream') && req.headers.range != null) {
          return
        }
        
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
