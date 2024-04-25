import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { UserEntity } from './user.entity';

@Entity('services')
export class ServicesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  inserted_by: number;

  @Column({
    comment:
      "FK (categories) & make sure category_id's parent_id row doesn't have 0 value",
    nullable: false,
  })
  @ManyToOne(() => CategoryEntity, (Category) => Category.id)
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}
