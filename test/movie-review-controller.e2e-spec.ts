import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import {
  createMovieReviewMock,
  defaultReturn,
  MockOmdbService,
} from '../src/apps/movie-review/__tests__/mocks';
import { CreateMovieReviewDto } from '../src/apps/movie-review/dto/create-movie-review.dto';
import { OmdbService } from '../src/apps/omdb/omdb.service';

describe('MovieReviewController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(OmdbService)
      .useClass(MockOmdbService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  describe('/movies-reviews (GET)', () => {
    it('should return a paginated array of movie reviews', async () => {
      const movieReview = await createMovieReviewMock(app);

      const response = await request(app.getHttpServer()).get('/movie-reviews');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toMatchObject({
        data: [
          {
            id: movieReview.id,
            title: movieReview.title,
            notes: movieReview.notes,
            released: movieReview.released,
            imdbRating: movieReview.imdbRating,
            genres: movieReview.genres,
          },
        ],
        pagination: {
          currentPage: 1,
          perPage: 10,
          totalItems: 1,
          previousPage: null,
          nextPage: null,
        },
      });
    });
  });

  describe('/movies-reviews (POST)', () => {
    it('should create a movie review', async () => {
      const dto: CreateMovieReviewDto = {
        title: 'Test',
        notes: 'Test',
      };

      const response = await request(app.getHttpServer())
        .post('/movie-reviews')
        .send(dto);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toMatchObject(defaultReturn);
    });

    it('should not create a movie review with duplicate title', async () => {
      const dto: CreateMovieReviewDto = {
        title: 'Test',
        notes: 'Test',
      };

      await request(app.getHttpServer()).post('/movie-reviews').send(dto);

      const response = await request(app.getHttpServer())
        .post('/movie-reviews')
        .send(dto);

      expect(response.status).toBe(HttpStatus.CONFLICT);
      expect(response.body).toEqual({
        statusCode: HttpStatus.CONFLICT,
        message: 'A movie review with this title already exists',
        error: 'Conflict',
      });
    });

    it('should validate create movie review dto', async () => {
      let dto: CreateMovieReviewDto = {
        title: '',
        notes: 'Test',
      };

      let response = await request(app.getHttpServer())
        .post('/movie-reviews')
        .send(dto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: [
          'title must be longer than or equal to 3 characters',
          'title should not be empty',
        ],
        error: 'Bad Request',
      });

      dto = {
        title: 'Test',
        notes: '',
      };

      response = await request(app.getHttpServer())
        .post('/movie-reviews')
        .send(dto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: [
          'notes must be longer than or equal to 3 characters',
          'notes should not be empty',
        ],
        error: 'Bad Request',
      });
    });
  });

  describe('/movies-reviews/:id (GET)', () => {
    it('should find a movie review', async () => {
      const movieReview = await createMovieReviewMock(app);
      const response = await request(app.getHttpServer()).get(
        `/movie-reviews/${movieReview.id}`,
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toMatchObject({
        id: movieReview.id,
        title: movieReview.title,
        notes: movieReview.notes,
        released: movieReview.released,
        imdbRating: movieReview.imdbRating,
        genres: movieReview.genres,
      });
    });

    it('should not find a movie review if not found', async () => {
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews/1',
      );

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
      expect(response.body).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Movie review not found',
        error: 'Not Found',
      });
    });
  });
});
