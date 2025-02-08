import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMovieReviewDto } from './dto/create-movie-review.dto';
import { MovieReviewRepository } from './repositories/movie-review.repository';

@Injectable()
export class MovieReviewService {
  constructor(private readonly movieRepository: MovieReviewRepository) {}

  async create(dto: CreateMovieReviewDto) {
    const alreadyExists = await this.movieRepository.findOne({
      where: { title: dto.title },
    });

    if (alreadyExists) {
      throw new ConflictException('A movie with this title already exists');
    }

    const movie = this.movieRepository.create(dto);

    return this.movieRepository.save(movie);
  }
}
