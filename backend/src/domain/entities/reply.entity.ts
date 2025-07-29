import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('replies')
export class Reply {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  content: string;

  @Column({ type: 'integer', default: 0 })
  score: number;

  @Column('uuid', { name: 'question_id' })
  questionId: string;

  @ManyToOne(() => Question, (question) => question.replies)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
