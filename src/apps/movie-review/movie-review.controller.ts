import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieReviewDto } from './dto/create-movie-review.dto';
import { MovieReviewService } from './movie-review.service';

@ApiTags('Movie Review')
@Controller('movie-reviews')
export class MovieReviewController {
  constructor(private readonly movieService: MovieReviewService) {}

  @Post()
  create(@Body() dto: CreateMovieReviewDto) {
    return this.movieService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.movieService.findOne(id);
  }
}
