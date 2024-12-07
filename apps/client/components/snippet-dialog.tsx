import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Snippets } from "@/utils/types";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";

const SyntaxHighlighter = Prism as unknown as React.FC<SyntaxHighlighterProps>;

interface P {
  snippetData: Snippets;
  isOpen: boolean;
  toggleDialog: () => void;
}

export const SnippetDialog = ({ snippetData, isOpen, toggleDialog }: P) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="md:ml-[8rem]">
        <DialogHeader>
          <DialogTitle>{snippetData.name}</DialogTitle>
          <DialogDescription>
            This is the code snippet you&apos;ve selected:
          </DialogDescription>
        </DialogHeader>
        <SyntaxHighlighter
          language="sql"
          className="rounded-md bg-gray-100 p-4 font-mono text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          showLineNumbers
          customStyle={{ fontSize: "12px", backgroundColor: "transparent" }}
        >
          {snippetData.generated_code}
        </SyntaxHighlighter>
      </DialogContent>
    </Dialog>
  );
};
