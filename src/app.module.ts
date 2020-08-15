import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatastoreModule } from './datastore/datastore.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatastoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
