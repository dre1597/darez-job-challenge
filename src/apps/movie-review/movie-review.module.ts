import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmdbModule } from '../omdb/omdb.module';
import { MovieReviewEntity } from './entities/movie-review.entity';
import { MovieReviewController } from './movie-review.controller';
import { MovieReviewService } from './movie-review.service';
import { MovieReviewRepository } from './repositories/movie-review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieReviewEntity]), OmdbModule],
  controllers: [MovieReviewController],
  providers: [MovieReviewService, MovieReviewRepository],
})
export class MovieReviewModule {}
