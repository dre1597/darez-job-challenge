import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type OmdbResponse = {
  Title: string;
  Released: string;
  imdbRating: string;
  Year: string;
  Genre: string;
};

@Injectable()
export class OmdbService {
  constructor(private readonly configService: ConfigService) {}

  async getMovieDetails(title: string) {
    const url = `${this.configService.get('omdbApi.url')}`;
    const apiKey = `${this.configService.get('omdbApi.apiKey')}`;
    const response = await fetch(`${url}?t=${title}&apikey=${apiKey}`);

    return (await response.json()) as OmdbResponse;
  }
}
