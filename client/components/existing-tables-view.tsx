"use client";
import api from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { RenderExistingTablesProps } from "@/utils/types";

interface P {
  isExistingTableModalOpen: boolean;
}

export const ExistingTablesView = ({ isExistingTableModalOpen }: P) => {
  const { user } = useUser();
  const { data: existingTables } = useQuery({
    queryKey: ["tables", user?.id, isExistingTableModalOpen],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await api.get<RenderExistingTablesProps[]>(
        `/table/${user?.id}`,
      );
      return data;
    },
    enabled: Boolean(user) && isExistingTableModalOpen,
  });

  if (!existingTables) return <div>Empty</div>;

  return (
    <div className="py-3">
      {existingTables?.map((table) => {
        return (
          <div key={table.name} className="mb-8">
            <h3 className="text-xl font-bold mb-4">{table.name}</h3>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Nullable</TableHead>
                  <TableHead>Primary</TableHead>
                  <TableHead>Unique</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.columns.map((col) => (
                  <TableRow key={col.name}>
                    <TableCell>{col.name}</TableCell>
                    <TableCell>{col.type}</TableCell>
                    <TableCell>{col.isNullable ? "Yes" : "No"}</TableCell>
                    <TableCell>{col.isPrimary ? "Yes" : "No"}</TableCell>
                    <TableCell>{col.isUnique ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};
