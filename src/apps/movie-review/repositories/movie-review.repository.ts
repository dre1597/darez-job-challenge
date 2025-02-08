import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../common/repositories/base-repository';
import { MovieReviewEntity } from '../entities/movie-review.entity';

@Injectable()
export class MovieReviewRepository extends BaseRepository<MovieReviewEntity> {
  constructor(
    @InjectRepository(MovieReviewEntity)
    private readonly repository: BaseRepository<MovieReviewEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
