import { AppDataSource } from "../const/dataSource";
import { Creator } from "../entity/creator.entity";
import { User } from "../entity/user.entity";
import { CreateCreator } from "../interfaces/creator.interface";

export class CreatorService {
  private static creatorRepo = AppDataSource.getRepository(Creator);
  private static userRepo = AppDataSource.getRepository(User);

  static async getAll(): Promise<Creator[]> {
    const creators = await this.creatorRepo.find();
    return creators;
  }

  private static async saveQuery(
    creatorObject: CreateCreator,
  ): Promise<Creator> {
    const { sql, name, email } = creatorObject;

    const user = await this.userRepo.findOneBy({
      email,
    });

    if (!user) {
      const newUser = this.userRepo.create({
        name: "temp",
        email,
      });

      await this.userRepo.save(newUser);

      const newCreator = this.creatorRepo.create({
        name,
        generated_code: sql,
        ...(newUser && { user: newUser }),
      });

      await this.creatorRepo.save(newCreator);

      return newCreator;
    }

    const newCreator = this.creatorRepo.create({
      name,
      generated_code: sql,
      ...(user && { user }),
    });

    await this.creatorRepo.save(newCreator);
    return newCreator;
  }

  static async executeQuery(
    creator: CreateCreator,
    shouldSaveQuery: boolean,
  ): Promise<void> {
    const { sql, name, email } = creator;
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await queryRunner.query(sql);
      return result;
    } catch (error) {
      throw new Error(error);
    } finally {
      await queryRunner.release();

      shouldSaveQuery && (await this.saveQuery({ sql, name, email }));
    }
  }
}
