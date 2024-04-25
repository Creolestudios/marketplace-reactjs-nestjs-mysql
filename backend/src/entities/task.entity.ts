import { MediaType } from 'src/utils/enums';
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
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';

@Entity('tasks')
export class TasksEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ comment: 'FK (categories)', nullable: false })
  @ManyToOne(() => CategoryEntity, (Category) => Category.id)
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @Column({ comment: 'FK (categories)', nullable: false })
  @ManyToOne(() => CategoryEntity, (Category) => Category.id)
  @JoinColumn({ name: 'sub_category_id' })
  sub_category_id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'employer_id' })
  employer_id: number;

  @Column({ default: null, comment: 'FK (users)' })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'specialist_id' })
  specialist_id: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: Get Started 1: To Finish Work 2: Specify Period',
    nullable: false,
  })
  date_and_time: number;

  @Column({ default: null })
  start_date_time?: Date;

  @Column({ default: null })
  end_date_time?: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  estimated_budget: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: no 1: yes',
    default: 1,
    nullable: false,
  })
  nemid_authorized: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 : business 1 : freelancer 2 : both',
    default: 2,
    nullable: false,
  })
  specialist_preference: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: no 1: yes',
    default: 0,
    nullable: false,
  })
  remote_job: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: no 1: yes',
    default: 0,
    nullable: false,
  })
  share_contact_details: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment:
      '1: Open 2: Active  3: Archived 4: Completed 5: cancellation_requested_by_employer 6: cancellation_requested_by_specialist 7: cancelled 8 : reported',
    nullable: false,
  })
  task_status: number;

  @Column({ length: 100, nullable: false })
  zipcode: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ default: null, comment: 'FK (users)', nullable: true })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'cancelled_by' })
  cancelled_by: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: employer 1: specialist 2:admin',
    default: null,
  })
  cancelled_by_type: number;

  @Column({ type: 'text', nullable: true })
  cancellation_reason: string;

  @Column({ type: 'text', comment: 'Object will be stored', nullable: true })
  cancellation_proof: string;

  @Column({ type: 'text', comment: 'Object will be stored', nullable: true })
  completion_proof: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: no 1: yes',
    default: 1,
  })
  visibility: number;

  @Column({ type: 'text', comment: 'Object will be stored', nullable: true })
  invited_users: string;

  @Column({ type: 'datetime', nullable: true })
  completed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('task_cancellation_history')
export class TaskCancellationHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Tasks) => Tasks.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({ default: null, comment: 'FK (users)', nullable: true })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'cancelled_by' })
  cancelled_by: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: employer 1: specialist 2:admin',
    default: null,
  })
  cancelled_by_type: number;

  @Column({ type: 'text', nullable: true })
  cancellation_reason: string;

  @Column({ type: 'text', comment: 'Object will be stored', nullable: true })
  cancellation_proof: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('task_disagreement_history')
export class TaskDisgreementHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'FK (tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (tasks) => tasks.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({ default: null, comment: 'FK (users)', nullable: true })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'disagree_by' })
  disagree_by: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: employer 1: specialist 2:admin',
    default: null,
  })
  disgree_by_type: number;

  @Column({ type: 'text', nullable: true })
  disgree_reason: string;

  @Column({ type: 'text', nullable: false })
  disagree_proofs: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('task_media')
export class TaskMediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Tasks) => Tasks.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({ nullable: false })
  media: string;

  @Column({ type: 'enum', enum: MediaType, nullable: false })
  media_type: MediaType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('task_bids')
export class TaskBidsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Tasks) => Tasks.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({ comment: 'FK(users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'specialist_id' })
  specialist_id: number;

  @Column({ type: 'text', nullable: false })
  bid_message: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  bid_amount: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: open 1: accepted, 2: rejected, 3: closed',
    nullable: false,
  })
  bid_status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('task_reviews')
export class TaskReviewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK(tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Tasks) => Tasks.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({ comment: 'FK(users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer_id: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0: employer 1: specialist',
    nullable: false,
  })
  reviewed_by: number;

  @Column({
    type: 'text',
    width: 600,
    comment: 'Add character limit validation upto 600 characters',
    nullable: false,
  })
  review: string;

  @Column({ nullable: false })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('reported_tasks')
export class ReportedTasksEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK(tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Tasks) => Tasks.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = employer 1 = specialist',
    nullable: false,
  })
  reported_by: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = open 1 = resolve',
    nullable: false,
  })
  status: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  report_reason: string;

  @Column({
    type: 'text',
    comment: 'Object will be stored',
    nullable: false,
  })
  proofs: string;

  @Column({
    type: 'text',
    comment:
      'It will store a serialized object when admin mark task as resolved and send payments to involved specialist/employer',
    nullable: true,
  })
  payments: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}
