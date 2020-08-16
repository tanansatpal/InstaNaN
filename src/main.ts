import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { runDbMigrations } from '@shared/utils';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await runDbMigrations();
  await app.listen(port);
}

(async () => {
  await bootstrap();
})();
