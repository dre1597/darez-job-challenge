import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { SortDirection } from '../../../common/enums/sort-direction.enum';

enum MovieReviewSortByFields {
  TITLE = 'title',
  RELEASED = 'released',
  IMDB_RATING = 'imdbRating',
}

export class FilterMovieReviewDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    enum: MovieReviewSortByFields,
    enumName: 'MovieReviewSortByFields',
  })
  @IsEnum(MovieReviewSortByFields)
  @IsOptional()
  sortBy?: MovieReviewSortByFields = MovieReviewSortByFields.TITLE;

  @ApiPropertyOptional({
    enum: SortDirection,
    enumName: 'SortDirection',
  })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection = SortDirection.ASC;
}
