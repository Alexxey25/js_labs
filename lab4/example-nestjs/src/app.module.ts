import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'), // Путь к папке с фронтендом
      serveRoot: '/', // Отдавать файлы по корневому URL
      exclude: ['/api*'], // Важно: исключить API маршруты
    }),
    VehiclesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}