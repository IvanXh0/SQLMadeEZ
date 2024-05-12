import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { QueryRunner } from 'typeorm';
import { dynamicDataSource } from '../const/dataSource'; // Assuming you have a dynamicDataSource function

export interface TableWithColumns {
  name: string;
  columns: {
    name: string;
    type: string;
    isNullable: boolean;
    isPrimary: boolean;
    isUnique: boolean;
  }[];
}

@Injectable()
export class TableService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  private async getQueryRunner(userId: string): Promise<QueryRunner> {
    const user = await this.userRepo.findOneBy({ userId });
    if (!user) throw new Error('User not found');

    const dataSource = await dynamicDataSource(userId);
    await dataSource.initialize();
    return dataSource.createQueryRunner();
  }

  async getTables(userId: string): Promise<TableWithColumns[]> {
    const queryRunner = await this.getQueryRunner(userId);
    await queryRunner.connect();

    try {
      const tables = await queryRunner.getTables();
      if (!tables.length) throw new Error('No tables found');

      return tables.map((table) => ({
        name: table.name,
        columns: table.columns.map((col) => ({
          name: col.name,
          type: col.type,
          isNullable: col.isNullable,
          isPrimary: col.isPrimary,
          isUnique: col.isUnique,
        })),
      }));
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
