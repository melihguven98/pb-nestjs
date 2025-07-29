import { Controller, Post, Body, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthUseCases } from '../../application/use-cases';
import { LoginDto, CreateUserDto, UserResponseDto } from '../dtos';
import { ResponseInterceptor } from '../interceptors';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authUseCases: AuthUseCases) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authUseCases.login(
      loginDto.email,
      loginDto.password,
    );

    return {
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: result.user.role,
      },
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authUseCases.register(createUserDto);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      message: 'User registered successfully',
    };
  }
}
