import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectUseCases } from '../../application/use-cases';
import { CreateProjectDto, UpdateProjectDto } from '../dtos';

// TODO: Import and use JwtAuthGuard when implemented
// @UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectUseCases: ProjectUseCases) {}

  @Get()
  async getAllProjects() {
    const projects = await this.projectUseCases.getAllProjects();

    return {
      success: true,
      data: projects,
    };
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    const project = await this.projectUseCases.getProjectById(id);

    return {
      success: true,
      data: project,
    };
  }

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: any,
  ) {
    // TODO: Get user ID from JWT token when auth is implemented
    const ownerId = 'temp-user-id'; // Placeholder

    const project = await this.projectUseCases.createProject({
      ...createProjectDto,
      ownerId,
      deadline: createProjectDto.deadline
        ? new Date(createProjectDto.deadline)
        : undefined,
    });

    return {
      success: true,
      data: project,
      message: 'Project created successfully',
    };
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const updateData = {
      ...updateProjectDto,
      deadline: updateProjectDto.deadline
        ? new Date(updateProjectDto.deadline)
        : undefined,
    };

    const project = await this.projectUseCases.updateProject(id, updateData);

    return {
      success: true,
      data: project,
      message: 'Project updated successfully',
    };
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    await this.projectUseCases.deleteProject(id);

    return {
      success: true,
      message: 'Project deleted successfully',
    };
  }

  @Get('owner/:ownerId')
  async getProjectsByOwner(@Param('ownerId') ownerId: string) {
    const projects = await this.projectUseCases.getProjectsByOwner(ownerId);

    return {
      success: true,
      data: projects,
    };
  }
}
