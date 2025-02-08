import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeBaseEntity,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<Model> extends TypeBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    select: false,
    name: 'updated_at',
  })
  updatedAt: Date;

  constructor(data?: Partial<Model>) {
    super();
    Object.assign(this, data ?? {});
  }
}
