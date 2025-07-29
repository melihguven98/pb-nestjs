import {
  User,
  Project,
  Candidate,
  Task,
  Question,
  Reply,
  CandidateStatus,
} from '../entities';

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(entity: Partial<T>): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByRole(role: string): Promise<User[]>;
}

export interface IProjectRepository extends IRepository<Project> {
  findByOwnerId(ownerId: string): Promise<Project[]>;
  findByStatus(status: string): Promise<Project[]>;
}

export interface ICandidateRepository extends IRepository<Candidate> {
  findByProjectId(projectId: string): Promise<Candidate[]>;
  findByStatus(status: CandidateStatus): Promise<Candidate[]>;
  findByEmail(email: string): Promise<Candidate | null>;
}

export interface ITaskRepository extends IRepository<Task> {
  findByCandidateId(candidateId: string): Promise<Task[]>;
  findByType(type: string): Promise<Task[]>;
  findByStatus(status: string): Promise<Task[]>;
}

export interface IQuestionRepository extends IRepository<Question> {
  findByTaskId(taskId: string): Promise<Question[]>;
  findByType(type: string): Promise<Question[]>;
}

export interface IReplyRepository extends IRepository<Reply> {
  findByQuestionId(questionId: string): Promise<Reply[]>;
}
