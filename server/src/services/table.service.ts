import { getQueryRunner } from '../utils/getQueryRunner';

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

export class TableService {
  static async getTables(userId: string): Promise<TableWithColumns[]> {
    const queryRunner = await getQueryRunner(userId);
    await queryRunner.connect();

    try {
      const tables = await queryRunner.getTables();
      if (!tables.length) throw new Error('No tables found');

      return tables.map(table => ({
        name: table.name,
        columns: table.columns.map(col => ({
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
