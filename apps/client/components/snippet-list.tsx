import { DeleteSnippetDialog } from "@/components/delete-snippet-dialog";
import api from "@/utils/api";
import { Snippets } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { SnippetDialog } from "./snippet-dialog";
import { Button } from "./ui/button";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";

const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

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
    onError: () => {
      toast.error("Failed to delete snippet");
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
