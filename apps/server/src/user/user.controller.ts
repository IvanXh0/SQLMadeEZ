import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    try {
      const users = await this.userService.getAll();
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':userId/queries')
  async getAllQueriesByUser(@Param('userId') userId: string) {
    try {
      const queriesByUser = await this.userService.getAllQueriesByUser(userId);

      if (!queriesByUser.length) {
        throw new HttpException('No queries found', HttpStatus.NOT_FOUND);
      }

      return queriesByUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async saveUser(@Body() userData: CreateUserDto) {
    try {
      const user = await this.userService.saveUser(userData);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    try {
      await this.userService.deleteUser(userId);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
