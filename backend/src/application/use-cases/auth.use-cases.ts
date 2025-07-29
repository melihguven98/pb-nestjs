import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/repository.interface';
import {
  IAuthService,
  IMailService,
} from '../../domain/interfaces/service.interface';
import { User } from '../../domain/entities';

@Injectable()
export class AuthUseCases {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IAuthService')
    private readonly authService: IAuthService,
    @Inject('IMailService')
    private readonly mailService: IMailService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.authService.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    const token = await this.authService.login(email, password);

    return { token: token.token, user };
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = await this.authService.register(userData);

    // Send welcome email
    try {
      await this.mailService.sendWelcomeEmail(user.email, user.firstName);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

    return user;
  }

  async validateToken(token: string): Promise<User> {
    const payload = await this.authService.validateToken(token);
    const user = await this.userRepository.findById(payload.id);

    if (!user || !user.isActive) {
      throw new Error('Invalid token');
    }

    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return;
    }

    // TODO: Implement password reset logic
    // Generate reset token, save to database, send email
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: Implement password reset logic
    // Validate reset token, update password
  }
}
