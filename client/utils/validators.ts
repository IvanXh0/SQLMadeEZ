import * as Yup from "yup";

export const sqlQueryValidationSchema = Yup.object({
  sqlQuery: Yup.string()
    .required("SQL Query is required")
    .test(
      "no-semicolon-end",
      "SQL Query should not end with semicolon",
      (value) => !value?.trim().endsWith(";"),
    )
    .test(
      "no-semicolon-start",
      "SQL Query should not start with semicolon",
      (value) => !value?.trim().startsWith(";"),
    )
    .test(
      "no-comma-end",
      "SQL Query should not end with a comma",
      (value) => !value?.trim().endsWith(","),
    ),
});
