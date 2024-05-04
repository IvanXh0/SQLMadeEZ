import { VaultSnippets } from "@/components/vault-snippets";

export default function Vault() {
  return (
    <main className="flex min-h-screen flex-col py-8 md:py-12 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
            Your Vault
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Access all your saved code and SQL snippets in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <VaultSnippets />
        </div>
      </div>
    </main>
  );
}
