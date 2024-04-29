import { QueryRunner, Table } from 'typeorm';
import { isASTArray, parseSql } from './parseSql';

export const ensureTableExists = async (
  queryRunner: QueryRunner,
  sql: string,
): Promise<void> => {
  const parsed = parseSql(sql);
  if (
    isASTArray(parsed) ||
    parsed.type !== 'insert' ||
    !parsed.table ||
    !parsed.columns
  ) {
    throw new Error('Invalid SQL query for dynamic table creation.');
  }

  console.log(parsed);
  const tableName = parsed.table[0].table;
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
};
