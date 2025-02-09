import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { formatOMDBDateToISO } from '../../common/helpers/format-date.helper';
import { OmdbService } from '../omdb/omdb.service';
import { CreateMovieReviewDto } from './dto/create-movie-review.dto';
import { FilterMovieReviewDto } from './dto/filter-movie-review.dto';
import { UpdateMovieReviewDto } from './dto/update-movie-review.dto';
import { MovieReviewRepository } from './repositories/movie-review.repository';

@Injectable()
export class MovieReviewService {
  constructor(
    private readonly movieReviewRepository: MovieReviewRepository,
    private readonly omdbService: OmdbService,
  ) {}

  findAll(dto: FilterMovieReviewDto) {
    return this.movieReviewRepository.findAll(dto);
  }

  async create(dto: CreateMovieReviewDto) {
    const alreadyExists = await this.movieReviewRepository.findOne({
      where: { title: dto.title },
    });

    if (alreadyExists) {
      throw new ConflictException(
        'A movie review with this title already exists',
      );
    }

    const movieDetails = await this.omdbService.getMovieDetails(dto.title);

    const movie = this.movieReviewRepository.create({
      ...dto,
      title: movieDetails.Title,
      released: formatOMDBDateToISO(movieDetails.Released),
      imdbRating: Number(movieDetails.imdbRating),
      genres: movieDetails.Genre,
    });

    return this.movieReviewRepository.save(movie);
  }

  async findOne(id: number) {
    const movieReview = await this.movieReviewRepository.findOne({
      where: { id },
    });

    if (!movieReview) {
      throw new NotFoundException('Movie review not found');
    }

    return movieReview;
  }

  async update(id: number, dto: UpdateMovieReviewDto) {
    const movieReview = await this.findOne(id);

    if (dto.title && dto.title !== movieReview.title) {
      const alreadyExists = await this.movieReviewRepository.findOne({
        where: { title: dto.title },
      });

      if (alreadyExists) {
        throw new ConflictException(
          'A movie review with this title already exists',
        );
      }
    }

    return this.movieReviewRepository.save({
      ...movieReview,
      ...dto,
    });
  }
}
