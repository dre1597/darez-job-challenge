import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('movies')
export class MovieEntity extends BaseEntity<MovieEntity> {
  @Column()
  title: string;
}
