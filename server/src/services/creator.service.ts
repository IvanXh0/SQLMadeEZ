import { AppDataSource } from "../const/dataSource";
import { Creator } from "../entity/creator.entity";
import { CreateCreator } from "../interfaces/creator.interface";

export class CreatorService {
  static async getAll() {
    const creators = await AppDataSource.getRepository(Creator).find();
    return creators;
  }

  private static async saveQuery(
    creatorObject: CreateCreator,
  ): Promise<Creator> {
    const { sql, name } = creatorObject;
    const newCreator = await AppDataSource.getRepository(Creator).save({
      name,
      generated_code: sql,
    });
    return newCreator;
  }

  static async executeQuery(creator: CreateCreator): Promise<void> {
    const { sql, name } = creator;
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await queryRunner.query(sql);
      return result;
    } catch (error) {
      throw new Error(error);
    } finally {
      await queryRunner.release();

      this.saveQuery({ sql, name });
    }
  }
}
