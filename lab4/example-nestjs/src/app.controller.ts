import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMainPage(@Res() res: Response) {
    res.sendFile('index.html', { root: 'client' });
  }

  @Get('api/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}

//@Controller()
//export class AppController {
//  constructor(private readonly appService: AppService) {}
//
//  @Get()
//  getHello(): string {
//    return this.appService.getHello();
//  }
//}
