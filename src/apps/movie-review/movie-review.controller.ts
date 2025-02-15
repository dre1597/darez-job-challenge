import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieReviewDto } from './dto/create-movie-review.dto';
import { FilterMovieReviewDto } from './dto/filter-movie-review.dto';
import { UpdateMovieReviewDto } from './dto/update-movie-review.dto';
import { MovieReviewService } from './movie-review.service';

@ApiTags('Movie Review')
@Controller('movie-reviews')
export class MovieReviewController {
  constructor(private readonly movieService: MovieReviewService) {}

  @Get()
  findAll(@Query() dto: FilterMovieReviewDto) {
    return this.movieService.findAll(dto);
  }

  @Post()
  create(@Body() dto: CreateMovieReviewDto) {
    return this.movieService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateMovieReviewDto,
  ) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.movieService.remove(id);
  }
}
