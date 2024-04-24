import { Parser } from 'node-sql-parser';

interface SQLAstNode {
  type: string;
  table?: Array<{ table: string }>;
  columns?: string[];
}

const parser = new Parser();

export const parseSql = (sql: string): SQLAstNode | SQLAstNode[] => {
  try {
    return parser.astify(sql) as SQLAstNode | SQLAstNode[];
  } catch (error) {
    throw new Error('Failed to parse SQL query.');
  }
};

export const isASTArray = (
  ast: SQLAstNode | SQLAstNode[],
): ast is SQLAstNode[] => Array.isArray(ast);
