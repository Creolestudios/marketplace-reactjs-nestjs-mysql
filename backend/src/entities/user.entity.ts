import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TasksEntity } from './task.entity';
import { CategoryEntity } from './category.entity';
import { ServicesEntity } from './service.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date', default: null })
  birth_date: Date;

  @Column({
    type: 'tinyint',
    comment: '1: yes 0:no',
    width: 4,
    nullable: false,
  })
  nemid_verified: number;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'text', default: null })
  bio: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '1: business 0:freelancer',
    default: null,
  })
  work_as: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '1: active 2:inactive 3:suspend',
    default: 1,
  })
  status: number;

  @Column({ length: 100, default: null })
  zipcode: string;

  @Column({ length: 100, default: null })
  city: string;

  @Column({ type: 'text', default: null })
  address: string;

  @Column({ default: null })
  last_seen: Date;

  @Column({ default: null })
  profile_photo: string;

  @Column({
    type: 'tinyint',
    width: 4,
    default: null,
  })
  remember_me: number;

  @Column({
    default: null,
    comment:
      'This will be verification token or reset password token. This will be an encoded string containing a key value pair of verification/forgot password token and flag indication whether it is of type verification or forgot password',
  })
  token: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    width: 4,
    default: 0,
    comment:
      '0 = no 1 = yes, This will be used to identify if user account is verified using the link sent over an email.',
  })
  verified: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '1: email 0:phone',
    nullable: false,
    default: 1,
  })
  preferred_way_of_contacting: number;

  @Column({ type: 'text', comment: 'serialized object', default: null })
  phone_numbers: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = normal sign in 1 = social',
    nullable: false,
  })
  sign_in_as: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment:
      '"0 = not completed 1 = completed, This will be set to 1 when user has filled full_name, email, birth_date, work_as, preferred_way_of_contacting & phone_numbers(in case of mobile selected as preferred way of contacting) fields.',
    nullable: false,
  })
  profile_completed: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = system user 1 = admin',
    nullable: false,
    default: 0,
  })
  user_role: number;

  @Column({ type: 'varchar', nullable: true })
  stripe_account_id: string;

  @Column({ type: 'varchar', nullable: true })
  stripe_customer_id: string;

  @Column({ type: 'varchar', nullable: true })
  sub_nemid: string;

  @Column({ type: 'datetime', nullable: true })
  nemid_verified_date: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: false, default: 0 })
  total_outstanding: number;

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;

  async validatePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

@Entity('user_cards')
export class UserCardsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'employer_id' })
  employer_id: number;

  @Column({ type: 'varchar', nullable: false })
  card_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('transactions')
export class TransactionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'sender' })
  sender: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'recipient' })
  recipient: number;

  @Column({ comment: 'FK (tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Task) => Task.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Will store stripe transaction id',
    nullable: false,
  })
  transaction_id: string;

  @Column({
    type: 'varchar',
    length: 300,
    comment: 'Will store stripe balance transaction id',
    nullable: false,
  })
  balance_transaction_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Will store stripe transaction receipt number',
    nullable: true,
  })
  receipt_number: string;

  @Column({
    type: 'varchar',
    length: 300,
    comment: 'Will store stripe transaction receipt url',
    nullable: true,
  })
  receipt_url: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = failure 1 = success',
    nullable: false,
  })
  status: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '1 = Task Payment 2 = Cancelled Task 3 = Reported Task',
    nullable: false,
  })
  type: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('user_categories_services')
export class UserCategoriesServicesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ comment: 'FK (categories)', nullable: false })
  @ManyToOne(() => CategoryEntity, (Category) => Category.id)
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @Column({ comment: 'FK (categories)', nullable: true })
  @ManyToOne(() => CategoryEntity, (Category) => Category.id)
  @JoinColumn({ name: 'sub_category_id' })
  sub_category_id: number;

  @Column({ comment: 'FK (services)', nullable: true })
  @ManyToOne(() => ServicesEntity, (Service) => Service.id)
  @JoinColumn({ name: 'service_id' })
  service_id: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  estimated_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('user_reported_profile')
export class UserReportProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'reported_user' })
  reported_user: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'reported_by' })
  reported_by: number;

  // @Column({ type: 'text', comment: 'Object will be stored', nullable: true })
  // report_proof: string;

  // @Column({ type: 'text', nullable: false })
  // report_reason: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = pending 1 = reviewed',
    nullable: false,
  })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('outstanding_transaction_history')
export class OutstandingTransactionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ unique: true, type: 'varchar', length: 100 })
  payment_id: string;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ comment: 'FK (tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Task) => Task.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Will store stripe transaction id',
    nullable: true,
  })
  transaction_id: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = failure 1 = success',
    nullable: false,
  })
  status: number;

  @Column({
    type: 'varchar',
    length: 300,
    comment: 'Will store stripe balance transaction id',
    nullable: true,
  })
  balance_transaction_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Will store stripe transaction receipt number',
    nullable: true,
  })
  receipt_number: string;

  @Column({
    type: 'varchar',
    length: 300,
    comment: 'Will store stripe transaction receipt url',
    nullable: true,
  })
  receipt_url: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '1 = Task Payment 2 = Cancelled Task 3 = Reported Task',
    nullable: false,
  })
  type: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0= Neutral 1 = Credit 2 = Debit',
    nullable: false,
  })
  // it is associated with user's outstanding amount
  // credit - amount is being added in user's wallet
  // debit - amount is being deducted in user's wallet
  // neutral - amount is neither added nor deducted from user's wallet, ex: user is doing payment via an actual card
  payment_type: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}
