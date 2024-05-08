"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { useUser } from "@clerk/nextjs";
import Editor from "@monaco-editor/react";
import { useEditorSetup } from "@/hooks/useEditorSetup";
import { sqlQueryValidationSchema } from "@/utils/validators";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { APIResponse, Creator, QueryError, QueryResult } from "@/utils/types";
import { Button } from "./ui/button";
import { RenderTable } from "./render-table";
import { toast } from "sonner";
import { TriangleAlertIcon } from "lucide-react";
import { validateQueryWithSchema } from "@/utils/validator-helpers";
import api from "@/utils/api";
import { LoadingSpinner } from "./loading-spinner";
import { useBoolean } from "usehooks-ts";
import { ExistingTablesModal } from "./existing-tables-modal";

interface P {
  snippetId?: string;
}

interface InitialValues {
  sqlQuery: string;
  queryName: string;
  saveQuery: boolean;
}

const EXECUTE_QUERY = "creator/execute-query";
const EXECUTE_AND_SAVE_QUERY = "creator/execute-query?shouldSaveQuery";
const GET_QUERY = (snippetId: string) => `creator/${snippetId}/query`;

export const ExecuteQuery = ({ snippetId }: P) => {
  const { user } = useUser();
  const { handleEditorDidMount } = useEditorSetup();
  const isEditMode = Boolean(snippetId);
  const { value: isExistingTableModalOpen, toggle: toggleExistingTableModal } =
    useBoolean(false);

  const { data: queryData, isLoading } = useQuery({
    queryKey: ["query", snippetId],
    queryFn: async () => {
      if (!snippetId) return;
      const { data } = await api.get<Creator>(GET_QUERY(snippetId));
      return data;
    },
    enabled: isEditMode,
  });
  const { data: queryResult, mutate: handleQuerySubmit } = useMutation<
    APIResponse<QueryResult>,
    QueryError,
    { sql: string; name: string; saveQuery: boolean }
  >({
    mutationFn: ({ sql, name, saveQuery }) =>
      api.post(saveQuery ? EXECUTE_AND_SAVE_QUERY : EXECUTE_QUERY, {
        sql,
        name: name ? name : "unnamed",
        email: user?.emailAddresses[0].emailAddress,
      }),
    onError: (error) => {
      if (!error) return;
      toast.error(
        error?.response?.data.error ?? "Something went wrong, please try again",
      );
    },
  });

  const initialValues: InitialValues = {
    sqlQuery: queryData?.generated_code ?? "",
    queryName: queryData?.name ?? "",
    saveQuery: false,
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <main className="flex flex-col items-center min-h-screen p-24 bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={sqlQueryValidationSchema}
        validate={(values) =>
          validateQueryWithSchema(sqlQueryValidationSchema, values)
        }
        onSubmit={({ sqlQuery, queryName, saveQuery }, { setSubmitting }) => {
          if (!sqlQuery) {
            toast.error("SQL Query is required");
            return;
          }
          handleQuerySubmit({ sql: sqlQuery, name: queryName, saveQuery });
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting, errors }) => (
          <Form className="w-full flex justify-center flex-col mx-auto items-center">
            <div className="flex flex-col max-w-4xl justify-center items-center w-full">
              <div className="grid grid-cols-2 gap-6 w-full py-4">
                <div className="space-y-4">
                  <label className="text-base font-medium" htmlFor="queryName">
                    Query Name
                  </label>
                  <Input
                    id="queryName"
                    name="queryName"
                    type="text"
                    placeholder="Enter a name for your snippet"
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    value={values.queryName}
                    onChange={(e) =>
                      setFieldValue("queryName", e.target.value.trim())
                    }
                  />
                </div>
                <div className="flex items-center justify-end">
                  <label
                    className="flex items-center gap-3 text-base font-medium"
                    htmlFor="shouldSaveQuery"
                  >
                    <Checkbox
                      id="shouldSaveQuery"
                      checked={values.saveQuery}
                      onCheckedChange={(e) => setFieldValue("saveQuery", e)}
                      className="h-5 w-5 rounded-md border-gray-300 text-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-400 dark:focus:ring-blue-400"
                    />
                    Save to Vault
                  </label>
                </div>
              </div>
              <Editor
                height="50vh"
                defaultLanguage="sql1"
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
                  theme: "customTheme",
                }}
              />
              {errors.sqlQuery && (
                <div className="rounded-md mt-5 bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900 dark:text-red-50 w-full">
                  <div className="flex items-start gap-3">
                    <TriangleAlertIcon className="h-5 w-5 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Validation Errors</h4>
                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        {Object.entries(errors.sqlQuery).map(([key, value]) => (
                          <li key={key}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4 w-full py-2 md:flex-row">
                <Button
                  type="submit"
                  disabled={isSubmitting || Boolean(errors.sqlQuery)}
                  className="w-full"
                >
                  Execute
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  onClick={toggleExistingTableModal}
                >
                  Show Existing Tables
                </Button>
              </div>
              {queryResult && queryResult.data && queryResult.data.result && (
                <RenderTable renderData={queryResult.data.result} />
              )}
              <ExistingTablesModal
                toggleExistingTableModal={toggleExistingTableModal}
                isExistingTableModalOpen={isExistingTableModalOpen}
              />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};
