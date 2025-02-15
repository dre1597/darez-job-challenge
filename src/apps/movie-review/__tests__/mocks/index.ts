import { INestApplication } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  RemoveOptions,
  SaveOptions,
} from 'typeorm';
import { FilterMovieReviewDto } from '../../dto/filter-movie-review.dto';
import { MovieReviewEntity } from '../../entities/movie-review.entity';
import { MovieReviewRepository } from '../../repositories/movie-review.repository';

export const defaultReturn = {
  id: 1,
  title: 'any_title',
  notes: 'any_notes',
  released: '2025-01-01',
  imdbRating: 10,
  genres: 'any_genres',
} as unknown as MovieReviewEntity;

export class MockMovieReviewRepository {
  findAll(dto: FilterMovieReviewDto) {
    return Promise.resolve({
      data: [defaultReturn],
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalItems: 1,
        previousPage: null,
        nextPage: null,
      },
    });
  }

  findOne(
    options: FindOneOptions<MovieReviewEntity>,
  ): Promise<typeof defaultReturn | null> {
    return Promise.resolve(null);
  }

  create(entityLike: DeepPartial<MovieReviewEntity>) {
    return Promise.resolve(defaultReturn);
  }

  save(entity: MovieReviewEntity, options?: SaveOptions) {
    return Promise.resolve(defaultReturn);
  }

  remove(entity: MovieReviewEntity, options?: RemoveOptions) {
    return Promise.resolve();
  }
}

export class MockOmdbService {
  getMovieDetails(title: string) {
    return {
      Title: 'any_title',
      Released: '01 Jan 2025',
      imdbRating: 10,
      Genre: 'any_genres',
    };
  }
}

export const createMovieReviewMock = async (
  app: INestApplication,
  entity: DeepPartial<MovieReviewEntity> = {
    title: 'any_test',
    notes: 'any_notes',
    released: '2025-01-01',
    imdbRating: 10,
    genres: 'any_genres',
  },
) => {
  const movieReviewRepository = app.get(MovieReviewRepository);

  const movieReview = movieReviewRepository.create(entity);

  return movieReviewRepository.save(movieReview);
};
