import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
// import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from './config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: DB_HOST,
    //   port: DB_PORT,
    //   username: DB_USERNAME,
    //   password: DB_PASSWORD,
    //   database: DB_NAME,
    //   entities: [],
    //   synchronize: true, // Set to false in production
    // }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}