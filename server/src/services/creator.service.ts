import { AppDataSource } from '../const/dataSource';
import { Creator } from '../entity/creator.entity';
import { User } from '../entity/user.entity';
import { CreateCreatorDto } from '../dtos/create-creator.dto';
import { Parser } from 'node-sql-parser';
import { QueryRunner, Table } from 'typeorm';

export const parser = new Parser();

export class CreatorService {
  private static creatorRepo = AppDataSource.getRepository(Creator);
  private static userRepo = AppDataSource.getRepository(User);

  static async getAll(): Promise<Creator[]> {
    return await this.creatorRepo.find({
      relations: { user: true },
    });
  }

  private static async saveQuery(
    creatorObject: CreateCreatorDto,
  ): Promise<Creator> {
    const { sql, name, email } = creatorObject;

    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      const newUser = this.userRepo.create({
        name: 'temp',
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

  private static async ensureTableExists(
    queryRunner: QueryRunner,
    sql: string,
  ): Promise<void> {
    let parsed;
    try {
      parsed = parser.astify(sql);
    } catch (error) {
      throw new Error('Failed to parse SQL query.');
    }

    if (parsed.type !== 'insert' || !parsed.table || !parsed.columns) {
      throw new Error('Invalid SQL query for dynamic table creation.');
    }
    const tableName = parsed.table[0].table;
    if (typeof tableName !== 'string') {
      throw new Error('Table name must be a string.');
    }

    const tableExists = await queryRunner.hasTable(tableName);
    if (!tableExists) {
      const columns = parsed.columns.map(col => ({
        name: col,
        type: 'varchar',
        isNullable: true,
      }));

      await queryRunner.createTable(
        new Table({
          name: tableName,
          columns: columns,
        }),
        true,
      );
    }
  }

  static async executeQuery(
    creator: CreateCreatorDto,
    shouldSaveQuery: boolean,
  ): Promise<void> {
    const { sql, name, email } = creator;
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    if (typeof sql !== 'string') {
      throw new Error('Invalid SQL query format.');
    }
    try {
      if (shouldSaveQuery) {
        await this.saveQuery({ sql, name, email });
      }

      await this.ensureTableExists(queryRunner, sql);

      const result = await queryRunner.query(sql);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error.message || 'Error executing SQL query.');
    } finally {
      await queryRunner.release();
    }
  }
}
