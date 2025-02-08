import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OmdbService } from '../../omdb/omdb.service';
import { MovieReviewService } from '../movie-review.service';
import { MovieReviewRepository } from '../repositories/movie-review.repository';
import {
  defaultReturn,
  MockMovieReviewRepository,
  MockOmdbService,
} from './mocks';

describe('MovieReviewService', () => {
  let service: MovieReviewService;
  let repository: MovieReviewRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieReviewService,
        {
          provide: MovieReviewRepository,
          useClass: MockMovieReviewRepository,
        },
        {
          provide: OmdbService,
          useClass: MockOmdbService,
        },
      ],
    }).compile();

    service = module.get(MovieReviewService);
    repository = module.get(MovieReviewRepository);
  });

  describe('create', () => {
    it('should create a movie review', async () => {
      const dto = {
        title: 'Test',
        notes: 'Test',
      };

      expect(await service.create(dto)).toEqual(defaultReturn);
    });

    it('should not create a movie review with duplicate title', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(defaultReturn));

      const dto = {
        title: 'Test',
        notes: 'Test',
      };

      await expect(service.create(dto)).rejects.toThrow(
        new ConflictException('A movie with this title already exists'),
      );
    });
  });

  describe('findOne', () => {
    it('should find a movie review', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(defaultReturn));

      expect(await service.findOne(1)).toEqual(defaultReturn);
    });

    it('should not find a movie review if not found', async () => {
      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Movie review not found'),
      );
    });
  });
});
