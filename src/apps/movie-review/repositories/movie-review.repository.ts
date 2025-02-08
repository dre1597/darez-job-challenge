import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from '../../../common/helpers/paginate.helper';
import { BaseRepository } from '../../../common/repositories/base-repository';
import { FilterMovieReviewDto } from '../dto/filter-movie-review.dto';
import { MovieReviewEntity } from '../entities/movie-review.entity';

@Injectable()
export class MovieReviewRepository extends BaseRepository<MovieReviewEntity> {
  constructor(
    @InjectRepository(MovieReviewEntity)
    private readonly repository: BaseRepository<MovieReviewEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findAll(dto: FilterMovieReviewDto) {
    const { page = 1, perPage = 10, title = '', sortDirection, sortBy } = dto;

    const query = this.repository
      .createQueryBuilder('movieReview')
      .where('movieReview.title ILIKE :title', { title: `%${title}%` })
      .select([
        'movieReview.id',
        'movieReview.title',
        'movieReview.notes',
        'movieReview.released',
        'movieReview.imdbRating',
        'movieReview.genres',
        'movieReview.createdAt',
      ])
      .orderBy(`movieReview.${sortBy}`, sortDirection);

    return paginate(query, page, perPage);
  }
}
