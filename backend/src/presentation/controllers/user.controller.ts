import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserUseCases } from '../../application/use-cases';
import { CreateUserDto, UpdateUserDto } from '../dtos';

// TODO: Import and use JwtAuthGuard when implemented
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get()
  async getAllUsers() {
    const users = await this.userUseCases.getAllUsers();

    return {
      success: true,
      data: users.map((user) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userUseCases.getUserById(id);

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userUseCases.createUser(createUserDto);

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      message: 'User created successfully',
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userUseCases.updateUser(id, updateUserDto);

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      },
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userUseCases.deleteUser(id);

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
