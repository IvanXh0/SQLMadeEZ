import { AppDataSource, dynamicDataSource } from '../const/dataSource';
import { Creator } from '../entity/creator.entity';
import { User } from '../entity/user.entity';
import { CreateCreatorDto } from '../dtos/create-creator.dto';
import { modifySqlForReturning } from '../utils/modifySqlForReturning';
import { ensureTableExists } from '../utils/ensureTableExists';

const sqlCommandHandlers: Record<string, (sql: string) => string> = {
  insert: sql => modifySqlForReturning(sql, 'insert'),
  update: sql => modifySqlForReturning(sql, 'update'),
  delete: sql => modifySqlForReturning(sql, 'delete'),
  select: sql => sql,
};

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
    userEmail: string,
  ): Promise<Creator> {
    const { sql, name, email } = creatorObject;

    const allQueries = await this.creatorRepo.find({
      where: { user: { email: userEmail } },
    });

    if (allQueries.length > 0) {
      const nameExists = allQueries.some(
        ({ name: queryName }) => queryName === name,
      );

      if (nameExists && name !== 'unnamed')
        throw new Error('Query name already exists.');

      const codeExists = allQueries.find(
        ({ generated_code }) => generated_code === sql,
      );

      if (codeExists)
        throw new Error(
          `Query code already saved under name ${codeExists.name}`,
        );
    }

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

  static async executeQuery(
    creator: CreateCreatorDto,
    shouldSaveQuery: boolean,
  ) {
    const { sql, email } = creator;
    const user = await this.userRepo.findOneBy({ email });

    if (!user) throw new Error('User not found.');

    const newDb = await dynamicDataSource(user.userId);
    await newDb.initialize().catch(e => {
      throw new Error('Failed to initialize the database: ' + e.message);
    });

    const queryRunner = newDb.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (shouldSaveQuery) await this.saveQuery(creator, user.email);
      const processedSql = sql.endsWith(';') ? sql.slice(0, -1) : sql;

      const commandType = processedSql.trim().split(' ')[0].toLowerCase();
      const processSql = sqlCommandHandlers[commandType] ?? (sql => sql);
      const finalSql = processSql(processedSql);

      if (commandType === 'insert')
        await ensureTableExists(queryRunner, processedSql);

      const result = await queryRunner.query(finalSql);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error.message ?? 'Error executing SQL query.');
    } finally {
      await queryRunner.release();
    }
  }

  static async getAllQueriesByUser(userId: string): Promise<Creator[]> {
    const user = await this.userRepo.findOneBy({ userId });

    if (!user) throw new Error('User not found.');

    return await this.creatorRepo.find({
      where: { user: { userId } },
      relations: ['user'],
    });
  }

  static async getQueryById(queryId: string): Promise<Creator> {
    return this.creatorRepo.findOneByOrFail({ id: queryId });
  }

  static async deleteQuery(queryId: string): Promise<void> {
    await this.creatorRepo.delete({ id: queryId });
  }
}
