"use client";
import { APIResponse, QueryResult } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const RenderTable = () => {
  const [sqlQuery, setSqlQuery] = useState("");

  const {
    data: queryResult,
    error,
    mutate: handleQuerySubmit,
  } = useMutation<APIResponse<QueryResult>, Error, string>({
    mutationFn: (sql: string) =>
      axios.post("http://localhost:3000/api/creator/execute-query", {
        sql,
        name: "temp",
        email: "temp@gmail.com",
      }),
  });

  const submitQuery = () => {
    handleQuerySubmit(sqlQuery);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-white">
      <textarea
        value={sqlQuery}
        onChange={(e) => setSqlQuery(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Enter SQL query here..."
        className="mb-4 text-black"
      ></textarea>
      <button
        onClick={submitQuery}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Execute Query
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
      {queryResult && queryResult.data && queryResult.data.result && (
        <table className="mt-4 text-black" border={2}>
          <thead>
            <tr>
              {Object.keys(queryResult.data.result[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queryResult.data.result.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};
