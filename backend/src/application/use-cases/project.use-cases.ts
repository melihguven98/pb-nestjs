import { Injectable, Inject } from '@nestjs/common';
import {
  IProjectRepository,
  IUserRepository,
} from '../../domain/interfaces/repository.interface';
import { Project, ProjectStatus } from '../../domain/entities';

@Injectable()
export class ProjectUseCases {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createProject(projectData: {
    title: string;
    description: string;
    position: string;
    requirements?: string;
    deadline?: Date;
    ownerId: string;
  }): Promise<Project> {
    const owner = await this.userRepository.findById(projectData.ownerId);
    if (!owner) {
      throw new Error('Owner not found');
    }

    const project = await this.projectRepository.create({
      ...projectData,
      status: ProjectStatus.ACTIVE,
    });

    return project;
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async updateProject(
    id: string,
    updateData: Partial<Project>,
  ): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }

    return await this.projectRepository.update(id, updateData);
  }

  async deleteProject(id: string): Promise<void> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }

    await this.projectRepository.delete(id);
  }

  async getProjectsByOwner(ownerId: string): Promise<Project[]> {
    return await this.projectRepository.findByOwnerId(ownerId);
  }

  async getProjectsByStatus(status: ProjectStatus): Promise<Project[]> {
    return await this.projectRepository.findByStatus(status);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.findAll();
  }

  async updateProjectStatus(
    id: string,
    status: ProjectStatus,
  ): Promise<Project> {
    return await this.updateProject(id, { status });
  }
}
