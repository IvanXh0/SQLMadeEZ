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
    )
    .test(
      "balanced-parentheses-count",
      "SQL Query should have balanced parentheses count",
      (value) => {
        if (!value) return true;

        const openParenthesesCount = (value.match(/\(/g) || []).length;
        const closeParenthesesCount = (value.match(/\)/g) || []).length;

        return openParenthesesCount === closeParenthesesCount;
      },
    )
    .test(
      "starts-with-sql-keyword",
      "SQL Query should start with a valid SQL keyword (SELECT, INSERT, UPDATE, DELETE, etc.)",
      (value) => {
        const validKeywords = [
          "SELECT",
          "INSERT",
          "UPDATE",
          "DELETE",
          "CREATE",
          "ALTER",
          "DROP",
          "GRANT",
          "REVOKE",
        ];
        const pattern = new RegExp(`^\\s*(${validKeywords.join("|")})\\b`, "i");
        return pattern.test(value ?? "");
      },
    ),
});
