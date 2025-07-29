import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../../domain/entities';
import { IProjectRepository } from '../../../domain/interfaces/repository.interface';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['owner', 'candidates'],
    });
  }

  async findById(id: string): Promise<Project | null> {
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['owner', 'candidates'],
    });
  }

  async findByOwnerId(ownerId: string): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { ownerId },
      relations: ['owner', 'candidates'],
    });
  }

  async findByStatus(status: string): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { status: status as any },
      relations: ['owner', 'candidates'],
    });
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return await this.projectRepository.save(project);
  }

  async update(id: string, updateData: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, updateData);
    const updatedProject = await this.findById(id);
    if (!updatedProject) {
      throw new Error('Project not found after update');
    }
    return updatedProject;
  }

  async delete(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
