import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate, CandidateStatus } from '../../../domain/entities';
import { ICandidateRepository } from '../../../domain/interfaces/repository.interface';

@Injectable()
export class CandidateRepository implements ICandidateRepository {
  constructor(
    @InjectRepository(Candidate)
    private readonly repository: Repository<Candidate>,
  ) {}

  async create(candidateData: Partial<Candidate>): Promise<Candidate> {
    const candidate = this.repository.create(candidateData);
    return await this.repository.save(candidate);
  }

  async findById(id: string): Promise<Candidate | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Candidate | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByProjectId(projectId: string): Promise<Candidate[]> {
    return await this.repository.find({ where: { projectId } });
  }

  async findByStatus(status: CandidateStatus): Promise<Candidate[]> {
    return await this.repository.find({ where: { status } });
  }

  async update(id: string, updateData: Partial<Candidate>): Promise<Candidate> {
    await this.repository.update(id, updateData);
    const updatedCandidate = await this.findById(id);
    if (!updatedCandidate) {
      throw new Error('Candidate not found after update');
    }
    return updatedCandidate;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<Candidate[]> {
    return await this.repository.find();
  }
}
