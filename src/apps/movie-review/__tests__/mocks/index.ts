import { DeepPartial, FindOneOptions, SaveOptions } from 'typeorm';
import { MovieReviewEntity } from '../../entities/movie-review.entity';

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
