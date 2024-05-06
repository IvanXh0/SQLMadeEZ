import { ExecuteQuery } from "@/components/execute-query";

interface P {
  params: { id: string };
}

export default function Page({ params }: P) {
  console.log(params);
  return <ExecuteQuery snippetId={params.id} />;
}
