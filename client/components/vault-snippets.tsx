"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// interface Creators {
//   name: string;
//
// }
// interface Snippet {
//   creators:
export const VaultSnippets = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { data: snippets } = useQuery({
    queryKey: ["snippets"],
    queryFn: () => {
      if (!user) return [];
      return axios
        .get(`http://localhost:3000/api/creator/${userId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });
  console.log(snippets);
  return (
    snippets &&
    snippets.length > 0 &&
    snippets.map((snippet) => (
      <div
        key={snippet.id}
        className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {snippet.name}
        </h2>
        <pre className="overflow-auto rounded-md bg-gray-100 p-4 font-mono text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          {snippet.generated_code}
        </pre>
      </div>
    ))
  );
};
