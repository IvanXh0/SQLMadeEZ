"use client";
import type { APIResponse, QueryError, QueryResult } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import Editor from "@monaco-editor/react";
import { useEditorSetup } from "@/hooks/useEditorSetup";
import { Formik, Form } from "formik";
import { RenderTable } from "./render-table";
import { sqlQueryValidationSchema } from "@/utils/validators";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

interface InitialValues {
  sqlQuery: string;
  queryName: string;
  saveQuery: boolean;
}

const EXECUTE_QUERY = "http://localhost:3000/api/creator/execute-query";
const EXECUTE_AND_SAVE_QUERY =
  "http://localhost:3000/api/creator/execute-query?shouldSaveQuery";

export const ExecuteQuery = () => {
  const { user } = useUser();

  const {
    data: queryResult,
    error,
    mutate: handleQuerySubmit,
  } = useMutation<
    APIResponse<QueryResult>,
    QueryError,
    { sql: string; name: string; saveQuery: boolean }
  >({
    mutationFn: ({ sql, name, saveQuery }) =>
      axios.post(saveQuery ? EXECUTE_AND_SAVE_QUERY : EXECUTE_QUERY, {
        sql,
        name: name ? name : "unnamed",
        email: user?.emailAddresses[0].emailAddress,
      }),
  });

  const { handleEditorDidMount } = useEditorSetup();

  const initialValues: InitialValues = {
    sqlQuery: "",
    queryName: "",
    saveQuery: false,
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-24 bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={sqlQueryValidationSchema}
        onSubmit={({ sqlQuery, queryName, saveQuery }, { setSubmitting }) => {
          if (sqlQuery)
            handleQuerySubmit({ sql: sqlQuery, name: queryName, saveQuery });
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting, errors }) => (
          <Form className="w-full flex justify-center flex-col mx-auto items-center">
            <div className="flex flex-row max-w-4xl justify-around gap-1.5">
              <Input
                placeholder="Name your query"
                className="w-1/2 mb-4 flex"
                name="queryName"
                id="queryName"
                type="text"
                value={values.queryName}
                onChange={(e) =>
                  setFieldValue("queryName", e.target.value.trim())
                }
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shouldSaveQuery"
                  checked={values.saveQuery}
                  onCheckedChange={(e) => setFieldValue("saveQuery", e)}
                />
                <label
                  htmlFor="shouldSaveQuery"
                  className="text-sm font-medium leading-none"
                >
                  Save query
                </label>
              </div>
            </div>
            <div className="flex flex-col max-w-4xl max-h-screen justify-center items-center w-full">
              <Editor
                height="40vh"
                defaultLanguage="sql1"
                theme="customTheme"
                value={values.sqlQuery}
                onMount={(editor, monaco) => {
                  handleEditorDidMount(editor, monaco);
                  editor.addCommand(
                    monaco.KeyMod.Shift | monaco.KeyCode.Enter,
                    () => handleSubmit(),
                  );
                }}
                onChange={(value) => setFieldValue("sqlQuery", value)}
                options={{
                  minimap: { enabled: false },
                }}
              />
              <Button type="submit" disabled={isSubmitting}>
                Execute Query
              </Button>
              {error && (
                <p className="text-red-500">{error.response?.data.error}</p>
              )}
              {errors && <p className="text-red-500">{errors.sqlQuery}</p>}
              {queryResult && queryResult.data && queryResult.data.result && (
                <RenderTable renderData={queryResult.data.result} />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};
