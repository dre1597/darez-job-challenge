import { Module } from '@nestjs/common';
import { MovieReviewModule } from './apps/movie-review/movie-review.module';
import { OmdbModule } from './apps/omdb/omdb.module';
import { CustomConfigModule } from './config/custom-config.module';
import { PostgresModule } from './providers/postgres.module';

@Module({
  imports: [CustomConfigModule, PostgresModule, MovieReviewModule, OmdbModule],
})
export class AppModule {}
