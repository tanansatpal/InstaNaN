import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@users/users.module';
import { DatastoreModule } from './datastore/datastore.module';
import { ConfigModule } from '@nestjs/config';
import { DatastoreService } from './datastore.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from '@posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, DatastoreModule.forRoot(),
    AuthModule.forRoot(),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatastoreService],
})
export class AppModule {
}
