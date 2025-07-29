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
  UseInterceptors,
} from '@nestjs/common';
import { ProjectUseCases } from '../../application/use-cases';
import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { ResponseInterceptor } from '../interceptors';

// TODO: Import and use JwtAuthGuard when implemented
// @UseGuards(JwtAuthGuard)
@Controller('projects')
@UseInterceptors(ResponseInterceptor)
export class ProjectController {
  constructor(private readonly projectUseCases: ProjectUseCases) {}

  @Get()
  async getAllProjects() {
    return await this.projectUseCases.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return await this.projectUseCases.getProjectById(id);
  }

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: any,
  ) {
    // TODO: Get user ID from JWT token when auth is implemented
    const ownerId = 'temp-user-id'; // Placeholder

    return await this.projectUseCases.createProject({
      ...createProjectDto,
      ownerId,
      deadline: createProjectDto.deadline
        ? new Date(createProjectDto.deadline)
        : undefined,
    });
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

    return await this.projectUseCases.updateProject(id, updateData);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    await this.projectUseCases.deleteProject(id);
    return { message: 'Project deleted successfully' };
  }

  @Get('owner/:ownerId')
  async getProjectsByOwner(@Param('ownerId') ownerId: string) {
    return await this.projectUseCases.getProjectsByOwner(ownerId);
  }
}
