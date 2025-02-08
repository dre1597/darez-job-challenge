import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OmdbService } from '../omdb/omdb.service';
import { CreateMovieReviewDto } from './dto/create-movie-review.dto';
import { MovieReviewRepository } from './repositories/movie-review.repository';

@Injectable()
export class MovieReviewService {
  constructor(
    private readonly movieReviewRepository: MovieReviewRepository,
    private readonly omdbService: OmdbService,
  ) {}

  async findAll() {
    return this.movieReviewRepository.find();
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
      released: movieDetails.Released,
      imdbRating: movieDetails.imdbRating,
      year: movieDetails.Year,
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
}
