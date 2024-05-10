import { Snippets } from "@/utils/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { SnippetDialog } from "./snippet-dialog";
import { useBoolean } from "usehooks-ts";
import { SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import { toast } from "sonner";
import { DeleteSnippetDialog } from "./delete-snippet-dialog";

interface P {
  snippetData: Snippets;
  userId: string;
}

export const SnippetList = ({ snippetData, userId }: P) => {
  const queryClient = useQueryClient();

  const { value: isDeleteDialogOpen, toggle: toggleDeleteDialog } =
    useBoolean(false);

  const { value: isSnippetDialogOpen, toggle: toggleSnippetDialog } =
    useBoolean(false);

  const { mutate: deleteSnippet } = useMutation({
    mutationFn: async (snippetId: string) => {
      await api.delete(`creator/${snippetId}`);
    },
    onSuccess: () => {
      toast.success("Snippet deleted successfully");

      queryClient.setQueryData(["snippets", userId], (oldData: Snippets[]) => {
        if (!oldData) return;

        return oldData.filter((snippet) => snippet.id !== snippetData.id);
      });
    },
  });
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
          <div>
            <Button size="icon" variant="ghost">
              <Link href={`/generate/${snippetData.id}`}>
                <SquareArrowOutUpRightIcon
                  size={20}
                  className="hover:cursor-pointer"
                />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" onClick={toggleDeleteDialog}>
              <TrashIcon size={20} className="text-red-700" />
            </Button>
          </div>
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
      <DeleteSnippetDialog
        isDialogOpen={isDeleteDialogOpen}
        toggleDialog={toggleDeleteDialog}
        deleteSnippet={() => deleteSnippet(snippetData.id)}
      />
    </>
  );
};
