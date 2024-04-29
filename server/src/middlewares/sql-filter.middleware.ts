import { NextFunction, Request, Response } from 'express';

export const sqlFilterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sql = req.body.sql.toLowerCase();

  const disallowedKeywords = ['truncate', 'exec', 'execute', 'grant', 'revoke'];

  const containsDisallowed = disallowedKeywords.some(keyword =>
    sql.includes(keyword),
  );

  if (containsDisallowed)
    return res.status(403).json({
      error: 'Your query contains disallowed keywords and has been blocked.',
    });

  next();
};
