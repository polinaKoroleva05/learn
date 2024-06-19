import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppWebSocket } from './app.websocket';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppWebSocket],
})
export class AppModule {}
