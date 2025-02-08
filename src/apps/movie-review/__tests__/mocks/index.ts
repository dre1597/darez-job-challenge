import { INestApplication } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  SaveOptions,
} from 'typeorm';
import { MovieReviewEntity } from '../../entities/movie-review.entity';
import { MovieReviewRepository } from '../../repositories/movie-review.repository';

export const defaultReturn = {
  id: 1,
  title: 'Test',
  notes: 'Test',
  released: 'Test',
  imdbRating: 'Test',
  year: 'Test',
  genres: 'Test',
} as unknown as MovieReviewEntity;

export class MockMovieReviewRepository {
  find(options?: FindManyOptions<MovieReviewEntity>) {
    return Promise.resolve([defaultReturn]);
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
}

export class MockOmdbService {
  getMovieDetails(title: string) {
    return {
      Title: 'Test',
      Released: 'Test',
      imdbRating: 'Test',
      Year: 'Test',
      Genre: 'Test',
    };
  }
}

export const createMovieReviewMock = async (app: INestApplication) => {
  const movieReviewRepository = app.get(MovieReviewRepository);

  const movieReview = movieReviewRepository.create({
    title: 'Test',
    notes: 'Test',
    released: 'Test',
    imdbRating: 'Test',
    year: 'Test',
    genres: 'Test',
  });

  return movieReviewRepository.save(movieReview);
};
