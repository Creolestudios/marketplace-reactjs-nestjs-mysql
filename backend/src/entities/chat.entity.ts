import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TasksEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';

@Entity('chat_rooms')
export class ChatRoomsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (tasks)', nullable: false })
  @ManyToOne(() => TasksEntity, (Task) => Task.id)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('room_participants')
export class RoomParticipantsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ comment: 'FK (chat_rooms)', nullable: false })
  @ManyToOne(() => ChatRoomsEntity, (Room) => Room.id)
  @JoinColumn({ name: 'room_id' })
  room_id: number;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '1 = Active 2 = Trash 3 = Archived',
    nullable: false,
    default: 1,
  })
  room_status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('chat_messages')
export class ChatMessagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ comment: 'FK (chat_rooms)', nullable: false })
  @ManyToOne(() => ChatRoomsEntity, (Room) => Room.id)
  @JoinColumn({ name: 'room_id' })
  room_id: number;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'text', comment: 'Object will be stored', nullable: true })
  media: string;

  @Column({
    type: 'tinyint',
    width: 4,
    comment: '0 = Unread 1 = Read',
    nullable: false,
    default: 0,
  })
  read_status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}

@Entity('chat_messages_read')
export class ChatMessagesReadEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column({ comment: 'FK (chat_messages)', nullable: false })
  @ManyToOne(() => ChatMessagesEntity, (Chat) => Chat.id)
  @JoinColumn({ name: 'chat_messages' })
  chat_messages_id: number;

  @Column({ comment: 'FK (users)', nullable: false })
  @ManyToOne(() => UserEntity, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  read_by: number;

  @Column({ type: 'datetime', nullable: true })
  read_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  deleted_at: Date;
}
