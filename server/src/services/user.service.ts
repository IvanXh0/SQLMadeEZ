import { AppDataSource } from '../const/dataSource';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entity/user.entity';

export class UserService {
  private static userRepo = AppDataSource.getRepository(User);

  static async getAll(): Promise<User[]> {
    return await this.userRepo.find({
      relations: { creators: true },
    });
  }

  static async getAllQueriesByUser(email: string): Promise<User[]> {
    return await this.userRepo.find({
      where: { email },
      relations: { creators: true },
    });
  }

  static async saveUser(user: CreateUserDto): Promise<User> {
    return await this.userRepo.save(user);
  }

  static async getUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email });
  }
}
