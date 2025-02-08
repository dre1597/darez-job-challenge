import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('movie-reviews')
export class MovieReviewEntity extends BaseEntity<MovieReviewEntity> {
  @Column({ unique: true })
  title: string;

  @Column()
  notes: string;

  @Column()
  released: string;

  @Column()
  imdbRating: number;

  @Column()
  genres: string;
}
