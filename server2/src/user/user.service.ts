import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { unlink } from 'fs/promises';
import { DB_PATH } from '../const/consts';
import { fileExists } from '../utils/fileExists';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: { creators: true },
    });
  }

  async getAllQueriesByUser(userId: string): Promise<User[]> {
    return this.userRepo.find({
      where: { userId },
      relations: { creators: true },
    });
  }

  async saveUser(user: CreateUserDto): Promise<User> {
    return this.userRepo.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOneBy({ email });
  }

  async deleteUser(userId: string): Promise<void> {
    const deleteResult = await this.userRepo.delete({ userId });
    const filePath = `${DB_PATH}/${userId}.db`;
    const fileToDelete = await fileExists(filePath);

    if (deleteResult.affected !== 0 && fileToDelete) {
      try {
        await unlink(filePath);
      } catch (error) {
        console.error('Failed to delete user file:', error);
        throw new Error('Failed to delete user file');
      }
    }
  }
}
