import { NextFunction, Request, Response } from 'express';

export const sqlFilterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sql = req.body.sql.toLowerCase();

  const disallowedKeywords = [
    'drop',
    'delete',
    'truncate',
    'exec',
    'execute',
    'grant',
    'revoke',
    'alter',
  ];

  const containsDisallowed = disallowedKeywords.some(keyword =>
    sql.includes(keyword),
  );

  if (containsDisallowed)
    return res.status(403).json({
      msg: 'Your query contains disallowed keywords and has been blocked.',
    });

  next();
};
