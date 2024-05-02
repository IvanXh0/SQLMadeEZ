import { AppDataSource } from '../const/dataSource';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entity/user.entity';
import { unlink } from 'node:fs/promises';
import { DB_PATH } from '../const/consts';
import { fileExists } from '../utils/fileExists';

export class UserService {
  private static userRepo = AppDataSource.getRepository(User);

  static async getAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: { creators: true },
    });
  }

  static async getAllQueriesByUser(email: string): Promise<User[]> {
    return this.userRepo.find({
      where: { email },
      relations: { creators: true },
    });
  }

  static async saveUser(user: CreateUserDto): Promise<User> {
    return this.userRepo.save(user);
  }

  static async getUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOneBy({ email });
  }

  static async deleteUser(userId: string): Promise<void> {
    const deleteResult = await this.userRepo.delete({ userId });
    const filePath = `${DB_PATH}/${userId}.db`;
    const fileToDelete = await fileExists(filePath);

    if (deleteResult.affected !== 0 && fileToDelete) {
      try {
        await unlink(filePath);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
