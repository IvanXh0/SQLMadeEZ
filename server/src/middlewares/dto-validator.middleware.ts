import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateCreatorDto } from '../dtos/creator.dto';

export const dtoValidationMiddleware =
  (type: typeof CreateCreatorDto, skipMissingProperties = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    const errors = await validate(dtoObj, { skipMissingProperties });

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: formatErrors(errors),
      });
    }

    next();
  };

const formatErrors = (errors: ValidationError[]) =>
  errors.reduce((acc, err) => {
    acc[err.property] = Object.values(err.constraints);
    return acc;
  }, {});
