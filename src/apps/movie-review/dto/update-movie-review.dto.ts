import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsOnlyDate } from '../../../common/decorators/is-only-date.decorator';

export class UpdateMovieReviewDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  notes?: string;

  @ApiPropertyOptional()
  @IsOnlyDate()
  @IsOptional()
  released?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  imdbRating?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  genres?: string;
}
