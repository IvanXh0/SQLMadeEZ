import { Button } from "@/components/ui/button";
import { VaultSnippets } from "@/components/vault-snippets";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Vault() {
  return (
    <main className="flex flex-col py-8 md:py-10 lg:py-12">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 md:mb-8 lg:mb-10">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl">
              Your Vault
            </h1>
            <Link href="/generate">
              <Button className="inline-flex items-center gap-2">
                <PlusIcon size={16} /> Create New Snippet
              </Button>
            </Link>
          </div>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
            Access all your saved code and SQL snippets in one place.
          </p>
        </div>
        <div>
          <VaultSnippets />
        </div>
      </div>
    </main>
  );
}
