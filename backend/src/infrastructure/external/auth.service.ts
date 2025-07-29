import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IAuthService } from '../../domain/interfaces/service.interface';
import { User } from '../../domain/entities';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: any }> {
    // This method will be called after password validation in use-case
    const payload = { email, sub: email };
    const token = this.jwtService.sign(payload);

    return { token, user: null }; // User will be provided by use-case
  }

  async register(userData: any): Promise<any> {
    // Password hashing will be handled in use-case
    // This is a placeholder implementation
    return userData;
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
