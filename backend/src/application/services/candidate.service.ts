import { Injectable, Inject } from '@nestjs/common';
import {
  ICandidateRepository,
  IProjectRepository,
} from '../../domain/interfaces/repository.interface';
import { IMailService } from '../../domain/interfaces/service.interface';
import { Candidate, CandidateStatus } from '../../domain/entities';

@Injectable()
export class CandidateService {
  constructor(
    @Inject('ICandidateRepository')
    private readonly candidateRepository: ICandidateRepository,
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('IMailService')
    private readonly mailService: IMailService,
  ) {}

  async createCandidate(candidateData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    resumeUrl?: string;
    projectId: string;
  }): Promise<Candidate> {
    const project = await this.projectRepository.findById(
      candidateData.projectId,
    );
    if (!project) {
      throw new Error('Project not found');
    }

    const existingCandidate = await this.candidateRepository.findByEmail(
      candidateData.email,
    );
    if (existingCandidate) {
      throw new Error('Candidate with this email already exists');
    }

    const candidate = await this.candidateRepository.create({
      ...candidateData,
      status: CandidateStatus.APPLIED,
    });

    return candidate;
  }

  async updateCandidateStatus(
    id: string,
    status: CandidateStatus,
    notes?: string,
  ): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    const updateData: Partial<Candidate> = { status };
    if (notes) {
      updateData.notes = notes;
    }

    const updatedCandidate = await this.candidateRepository.update(
      id,
      updateData,
    );

    // Send status update notification
    try {
      // TODO: Send appropriate email based on status
    } catch (error) {
      console.error('Failed to send status update email:', error);
    }

    return updatedCandidate;
  }

  async getCandidatesByProject(projectId: string): Promise<Candidate[]> {
    return await this.candidateRepository.findByProjectId(projectId);
  }

  async getCandidatesByStatus(status: CandidateStatus): Promise<Candidate[]> {
    return await this.candidateRepository.findByStatus(status);
  }

  async updateCandidateScore(id: string, score: number): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    return await this.candidateRepository.update(id, { score });
  }

  async addCandidateNotes(id: string, notes: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    const existingNotes = candidate.notes || '';
    const updatedNotes = existingNotes ? `${existingNotes}\n\n${notes}` : notes;

    return await this.candidateRepository.update(id, { notes: updatedNotes });
  }

  async getAllCandidates(): Promise<Candidate[]> {
    return await this.candidateRepository.findAll();
  }

  async getCandidateById(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error('Candidate not found');
    }
    return candidate;
  }
}
