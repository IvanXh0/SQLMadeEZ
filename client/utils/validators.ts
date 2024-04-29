import * as Yup from "yup";

export const sqlQueryValidationSchema = Yup.object({
  sqlQuery: Yup.string()
    .required("SQL Query is required")
    .test(
      "no-semicolon-end",
      "SQL Query should not end with semicolon",
      (value) => !value?.trim().endsWith(";"),
    ),
});
