export const modifySqlForReturning = (sql: string, type: string): string => {
  const shouldModify = ['insert', 'update', 'delete'].includes(type);

  if (shouldModify && !sql.toLowerCase().includes('returning')) {
    return `${sql.trim()} RETURNING *`;
  }
  return sql;
};
