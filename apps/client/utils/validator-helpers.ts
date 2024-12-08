import { AnyObjectSchema, ValidationError } from "yup";

export interface ValidationErrors {
  [key: string]: string[];
}

export const validateQueryWithSchema = <T>(
  schema: AnyObjectSchema,
  values: T,
): ValidationErrors => {
  try {
    schema.validateSync(values, { abortEarly: false });
    return {};
  } catch (err) {
    return (err as ValidationError).inner.reduce(
      (acc: ValidationErrors, curr) => {
        if (!acc[curr.path as keyof ValidationErrors]) {
          acc[curr.path as keyof ValidationErrors] = [];
        }
        acc[curr.path as keyof ValidationErrors].push(curr.message);
        return acc;
      },
      {},
    );
  }
};
