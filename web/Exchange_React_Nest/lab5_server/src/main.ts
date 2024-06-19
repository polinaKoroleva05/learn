import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import {WsAdapter} from "@nestjs/platform-ws"




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:8080"],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept,Access-Control-Allow-Origin',
  });
  //app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3001);
}
bootstrap();
