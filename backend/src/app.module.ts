import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Config
import { getDatabaseConfig } from './config/database.config';
import { getJwtConfig } from './config/jwt.config';

// Domain Entities
import {
  User,
  Project,
  Candidate,
  Task,
  Question,
  Reply,
} from './domain/entities';

// Infrastructure
import {
  ProjectRepository,
  CandidateRepository,
  UserRepository,
} from './infrastructure/database/repositories';
import {
  MailService,
  AuthService,
} from './infrastructure/external';

// Application Services
import { CandidateService } from './application/services';
import { ProjectUseCases, AuthUseCases } from './application/use-cases';

// Presentation
import { CandidateController, ProjectController, AuthController } from './presentation/controllers';

// Legacy controllers (to be removed)
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Project, Candidate, Task, Question, Reply]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [
    // Legacy controller (to be removed)
    AppController,
    // Clean Architecture controllers
    CandidateController,
    ProjectController,
    AuthController,
  ],
  providers: [
    // Legacy service (to be removed)
    AppService,
    // Clean Architecture services
    CandidateService,
    ProjectUseCases,
    AuthUseCases,
    // Repository providers with interface binding
    {
      provide: 'ICandidateRepository',
      useClass: CandidateRepository,
    },
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IMailService',
      useClass: MailService,
    },
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
})
export class AppModule {}
