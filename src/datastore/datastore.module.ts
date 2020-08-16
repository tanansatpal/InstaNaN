import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConnectionOptions } from '@shared/utils';

@Module({})
export class DatastoreModule {
  static async forRoot() {
    const connOptions = await getDbConnectionOptions(process.env.NODE_ENV);
    return {
      module: DatastoreModule,
      imports: [
        TypeOrmModule.forRoot(connOptions),
      ],
      providers: [],
    };
  }
}
