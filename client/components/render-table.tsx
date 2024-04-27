"use client";
import { APIResponse, QueryError, QueryResult } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Textarea } from "./ui/textarea";

export const RenderTable = () => {
  const [sqlQuery, setSqlQuery] = useState("");

  const {
    data: queryResult,
    error,
    mutate: handleQuerySubmit,
  } = useMutation<APIResponse<QueryResult>, QueryError, string>({
    mutationFn: (sql: string) =>
      axios.post("http://localhost:3000/api/creator/execute-query", {
        sql,
        name: "temp",
        email: "ivan.apostolovski@gmail.com",
      }),
  });

  const submitQuery = () => {
    handleQuerySubmit(sqlQuery);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-white">
      <Textarea
        value={sqlQuery}
        onChange={(e) => setSqlQuery(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Enter SQL query here..."
        className="mb-4 text-black"
      />
      <Button onClick={submitQuery}>Execute Query</Button>
      {error && <p className="text-red-500">{error.response?.data.error}</p>}
      {queryResult && queryResult.data && queryResult.data.result && (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(queryResult.data.result[0]).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {queryResult.data.result.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value) => (
                  <TableCell key={value}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
};
