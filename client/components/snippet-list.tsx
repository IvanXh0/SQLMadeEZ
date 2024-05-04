import { Snippets } from "@/utils/types";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface P {
  snippetData: Snippets;
}

export const SnippetList = ({ snippetData }: P) => {
  return (
    <div
      key={snippetData.id}
      className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
    >
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {snippetData.name}
      </h2>
      <SyntaxHighlighter
        language="sql"
        className="rounded-md bg-gray-100 p-4 font-mono text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
        showLineNumbers
        customStyle={{ fontSize: "12px", backgroundColor: "transparent" }}
      >
        {snippetData.generated_code}
      </SyntaxHighlighter>
    </div>
  );
};
