import { Module } from '@nestjs/common';
import { CustomConfigModule } from './config/custom-config.module';
import { PostgresModule } from './providers/postgres.module';

@Module({
  imports: [CustomConfigModule, PostgresModule],
})
export class AppModule {}
