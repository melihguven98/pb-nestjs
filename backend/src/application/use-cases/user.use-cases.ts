import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/repository.interface';
import { IAuthService } from '../../domain/interfaces/service.interface';
import { User, UserRole } from '../../domain/entities';

@Injectable()
export class UserUseCases {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  }): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await this.authService.hashPassword(
      userData.password,
    );

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: userData.role || UserRole.RECRUITER,
    });

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (updateData.password) {
      updateData.password = await this.authService.hashPassword(
        updateData.password,
      );
    }

    return await this.userRepository.update(id, updateData);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return await this.userRepository.findByRole(role);
  }
}
