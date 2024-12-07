"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NoSnippets } from "@/components/no-snippets";
import { SnippetList } from "@/components/snippet-list";
import api from "@/utils/api";
import type { Snippets } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const VaultSnippets = () => {
  const { user } = useUser();
  const userId = user?.id;

  const { data: snippets, isPending } = useQuery<Snippets[]>({
    queryKey: ["snippets", userId],
    queryFn: async () => {
      if (!userId) return [];
      try {
        const response = await api.get<Snippets[]>(`creator/${userId}`);
        return response.data;
      } catch (err) {
        return [];
      }
    },
    enabled: Boolean(userId),
  });

  const snippetsExist = snippets && snippets.length > 0;

  if (isPending) return <LoadingSpinner />;
  return (
    <>
      {!snippetsExist ? (
        <NoSnippets />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {snippets?.map((snippet) => (
            <SnippetList
              key={snippet.id}
              snippetData={snippet}
              userId={userId ?? ""}
            />
          ))}
        </div>
      )}
    </>
  );
};
