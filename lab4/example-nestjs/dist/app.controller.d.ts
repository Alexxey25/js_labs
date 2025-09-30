import { Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getMainPage(res: Response): void;
    getHello(): string;
}
