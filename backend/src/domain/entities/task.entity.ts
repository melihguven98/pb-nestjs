import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';

export enum TaskType {
  INTERVIEW = 'interview',
  TECHNICAL_TEST = 'technical_test',
  ASSIGNMENT = 'assignment',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'task_type',
    type: 'enum',
    enum: TaskType,
  })
  taskType: TaskType;

  @Column({
    name: 'task_status',
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  taskStatus: TaskStatus;

  @Column({ name: 'candidate_id' })
  candidateId: number;

  @ManyToOne(() => Candidate, (candidate) => candidate.tasks)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;
}
