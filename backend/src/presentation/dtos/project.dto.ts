import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ProjectStatus } from '../../domain/entities';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;
}

export class ProjectResponseDto {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  position: string;
  requirements?: string;
  deadline?: Date;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
