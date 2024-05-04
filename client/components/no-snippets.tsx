import { CodeIcon } from "@/icons/code-icon";
import Link from "next/link";

export const NoSnippets = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="bg-gray-100 rounded-full p-6 dark:bg-gray-800">
        <CodeIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight">No Snippets Found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          You haven&apos;t created any code snippets yet. Click the button below
          to get started.
        </p>
      </div>
      <div className="mt-6">
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/generate"
        >
          Create New Snippet
        </Link>
      </div>
    </div>
  );
};
