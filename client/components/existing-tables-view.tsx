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
import { QueryError, RenderExistingTablesProps } from "@/utils/types";
import { LoadingSpinner } from "./loading-spinner";
import { NoTablesFound } from "./no-tables-found";
import { Button } from "./ui/button";
import { EditIcon, TrashIcon, ZoomInIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type ActionClick = "view" | "edit" | "delete";

interface P {
  isExistingTableModalOpen: boolean;
  handleSetSQLQuery: (value: string) => void;
  toggleExistingTableModal: () => void;
}

export const ExistingTablesView = ({
  isExistingTableModalOpen,
  handleSetSQLQuery,
  toggleExistingTableModal,
}: P) => {
  const { user } = useUser();
  const {
    data: existingTables,
    error,
    isLoading,
  } = useQuery<RenderExistingTablesProps[], QueryError>({
    queryKey: ["tables", user?.id, isExistingTableModalOpen],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await api.get<RenderExistingTablesProps[]>(
        `/table/${user?.id}`,
      );
      return data;
    },
    retry: 1,
    enabled: Boolean(user) && isExistingTableModalOpen,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!existingTables) return <NoTablesFound />;

  if (error)
    return (
      <p className="py-3 space-y-5 text-semibold text-lg">
        {error.response?.data?.msg}
      </p>
    );

  const handleActionButtonClick = (type: ActionClick, tableName: string) => {
    if (type === "view") {
      handleSetSQLQuery(`SELECT * FROM ${tableName}`);
      toggleExistingTableModal();
    }

    if (type === "edit") {
      handleSetSQLQuery(`ALTER TABLE ${tableName}`);
      toggleExistingTableModal();
    }

    if (type === "delete") {
      handleSetSQLQuery(`DROP TABLE ${tableName}`);
      toggleExistingTableModal();
    }
  };

  return (
    <Accordion type="single" collapsible className="py-3">
      {existingTables.map((table) => (
        <AccordionItem key={table.name} value={table.name}>
          <div className="flex justify-between items-center mb-4">
            <AccordionTrigger className="text-md md:text-lg font-bold">
              {table.name}
            </AccordionTrigger>
            <div className="flex space-x-2">
              <Button
                variant="default"
                size={window.innerWidth < 768 ? "icon" : "sm"}
                onClick={() => handleActionButtonClick("view", table.name)}
              >
                <ZoomInIcon size={16} className="mr-2" />
                <span className="hidden md:block">View</span>
              </Button>
              <Button
                variant="secondary"
                size={window.innerWidth < 768 ? "icon" : "sm"}
                onClick={() => handleActionButtonClick("edit", table.name)}
              >
                <EditIcon size={16} className="mr-2" />
                <span className="hidden md:block">Edit</span>
              </Button>
              <Button
                variant="destructive"
                size={window.innerWidth < 768 ? "icon" : "sm"}
                onClick={() => handleActionButtonClick("delete", table.name)}
              >
                <TrashIcon size={16} className="mr-2" />
                <span className="hidden md:block">Delete</span>
              </Button>
            </div>
          </div>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
