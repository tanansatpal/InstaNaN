import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@users/users.module';
import { DatastoreModule } from './datastore/datastore.module';
import { ConfigModule } from '@nestjs/config';
import { DatastoreService } from './datastore.service';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatastoreModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, DatastoreService],
})
export class AppModule {
}
