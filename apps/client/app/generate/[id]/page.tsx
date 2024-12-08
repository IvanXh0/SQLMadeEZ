import { ExecuteQuery } from "@/components/execute-query";

interface P {
  params: { id: string };
}

export default function Page({ params }: P) {
  return <ExecuteQuery snippetId={params.id} />;
}
