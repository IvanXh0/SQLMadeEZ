import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const validateDto =
  <T>(type: new () => T, skipMissingProperties = false): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    const errors = await validate(dtoObj as object, {
      skipMissingProperties,
      whitelist: true,
    });

    if (errors.length > 0)
      return res.status(400).json({
        message: 'Validation errors',
        errors: formatErrors(errors),
      });

    next();
  };

const formatErrors = (errors: ValidationError[]): Record<string, string[]> =>
  errors.reduce((acc, err) => {
    acc[err.property] = Object.values(err.constraints);
    return acc;
  }, {});
