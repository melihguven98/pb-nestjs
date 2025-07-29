import { User } from '../entities';

export interface IAuthService {
  login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }>;
  register(userData: Partial<User>): Promise<User>;
  validateToken(token: string): Promise<User>;
  hashPassword(password: string): Promise<string>;
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}

export interface IMailService {
  sendWelcomeEmail(email: string, name: string): Promise<void>;
  sendInterviewInvitation(email: string, taskDetails: any): Promise<void>;
  sendTaskNotification(email: string, taskDetails: any): Promise<void>;
}

export interface IFileService {
  uploadFile(file: any, path: string): Promise<string>;
  deleteFile(url: string): Promise<void>;
  getFileUrl(path: string): string;
}

export interface IQueueService {
  addJob(queueName: string, jobData: any, options?: any): Promise<void>;
  processJob(queueName: string, processor: (job: any) => Promise<void>): void;
}
