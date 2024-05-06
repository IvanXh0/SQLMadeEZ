import { Snippets } from "@/utils/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { SnippetDialog } from "./snippet-dialog";
import { useBoolean } from "usehooks-ts";
import { FolderOpenIcon } from "lucide-react";
import Link from "next/link";

interface P {
  snippetData: Snippets;
}

export const SnippetList = ({ snippetData }: P) => {
  const { value: isSnippetDialogOpen, toggle: toggleSnippetDialog } =
    useBoolean(false);
  return (
    <>
      <div
        key={snippetData.id}
        className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
      >
        <div className="flex items-center justify-between">
          <h2
            className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100 hover:cursor-zoom-in"
            onClick={toggleSnippetDialog}
          >
            {snippetData.name}
          </h2>
          <Link href={`/generate/id=${snippetData.id}`}>
            <FolderOpenIcon className="hover:cursor-pointer" />
          </Link>
        </div>
        <SyntaxHighlighter
          language="sql"
          className="rounded-md bg-gray-100 p-4 font-mono text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          showLineNumbers
          customStyle={{ fontSize: "12px", backgroundColor: "transparent" }}
        >
          {snippetData.generated_code}
        </SyntaxHighlighter>
      </div>
      <SnippetDialog
        snippetData={snippetData}
        isOpen={isSnippetDialogOpen}
        toggleDialog={toggleSnippetDialog}
      />
    </>
  );
};
