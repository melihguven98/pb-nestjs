import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { Reply } from './reply.entity';

export enum QuestionType {
  TEXT = 'text',
  MULTIPLE_CHOICE = 'multiple_choice',
  FILE_UPLOAD = 'file_upload',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column('json', { nullable: true })
  options: string[];

  @Column({ type: 'integer', default: 1 })
  order: number;

  @Column({ default: true, name: 'is_required' })
  isRequired: boolean;

  @Column({ name: 'task_id' })
  taskId: string;

  @OneToMany(() => Reply, (reply) => reply.question)
  replies: Reply[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
