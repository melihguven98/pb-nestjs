import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CandidateService } from '../../application/services/candidate.service';
import { CreateCandidateDto } from '../dtos/candidate.dto';
import { CandidateStatus } from '../../domain/entities';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return await this.candidateService.createCandidate(createCandidateDto);
  }

  @Get()
  async getCandidates(
    @Query('projectId') projectId?: string,
    @Query('status') status?: CandidateStatus,
  ) {
    if (projectId) {
      return await this.candidateService.getCandidatesByProject(projectId);
    }

    if (status) {
      return await this.candidateService.getCandidatesByStatus(status);
    }

    return await this.candidateService.getAllCandidates();
  }

  @Get(':id')
  async getCandidateById(@Param('id') id: string) {
    return await this.candidateService.getCandidateById(id);
  }
}
