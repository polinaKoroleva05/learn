import { Controller, Delete, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/brokers")
  getBrokers(): string {
    console.log("brokers request");
    return this.appService.getBrokers();
  }
  @Get()
  serverStart(): string {
    return "hello, server is running";
  }

  @Get("/stocks")
  getStocks(): string {
    console.log("stocks request");
    return this.appService.getStocks();
  }

  @Get("/stock")
  getStock(@Query("designation") designation: string): string {
    console.log("stock request", designation);
    return this.appService.getStock(designation);
  }

  @Delete("/brokers")
  deleteBroker(@Query("id") id: number): string {
    console.log("id for delete", id);
    return this.appService.deleteBroker(+id);
  }

  @Post("/brokers")
  changeMoney(@Query("id") id: number, @Body() body ): string {
    console.log(body);
    console.log(`id ${id} wants ${body.money} money`);
    return this.appService.changeMoney(+id, +body.money);
  }

  @Post("/newbroker")
  createBroker(@Body() body ): string {
    console.log(`create ${body.name}  with ${body.money} money`);
    return this.appService.createBroker(body);
  }
}
