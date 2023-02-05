import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    name: 'USER_SERVICE',
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8081,
    }
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
