export const modifySqlForReturning = (sql: string, type: string): string => {
  if (type === 'insert' && !sql.toLowerCase().includes('returning')) {
    return `${sql.trim()} RETURNING *`;
  }
  return sql;
};
