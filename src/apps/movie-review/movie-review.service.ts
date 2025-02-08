import { ConflictException, Injectable } from '@nestjs/common';
import { OmdbService } from '../omdb/omdb.service';
import { CreateMovieReviewDto } from './dto/create-movie-review.dto';
import { MovieReviewRepository } from './repositories/movie-review.repository';

@Injectable()
export class MovieReviewService {
  constructor(
    private readonly movieRepository: MovieReviewRepository,
    private readonly omdbService: OmdbService,
  ) {}

  async create(dto: CreateMovieReviewDto) {
    const alreadyExists = await this.movieRepository.findOne({
      where: { title: dto.title },
    });

    if (alreadyExists) {
      throw new ConflictException('A movie with this title already exists');
    }

    const movieDetails = await this.omdbService.getMovieDetails(dto.title);

    const movie = this.movieRepository.create({
      ...dto,
      title: movieDetails.Title,
      released: movieDetails.Released,
      imdbRating: movieDetails.imdbRating,
      year: movieDetails.Year,
      genres: movieDetails.Genre,
    });

    return this.movieRepository.save(movie);
  }
}
