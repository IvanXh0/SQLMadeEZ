import { ExistingTablesView } from "./existing-tables-view";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface P {
  toggleExistingTableModal: () => void;
  isExistingTableModalOpen: boolean;
  handleSetSQLQuery: (value: string) => void;
}

export const ExistingTablesModal = ({
  toggleExistingTableModal,
  isExistingTableModalOpen,
  handleSetSQLQuery,
}: P) => {
  return (
    <Sheet
      open={isExistingTableModalOpen}
      onOpenChange={toggleExistingTableModal}
    >
      <SheetContent side="right" className="overflow-scroll !max-w-3xl">
        <SheetHeader>
          <SheetTitle>Existing Tables</SheetTitle>
        </SheetHeader>
        <ExistingTablesView
          isExistingTableModalOpen={isExistingTableModalOpen}
          handleSetSQLQuery={handleSetSQLQuery}
          toggleExistingTableModal={toggleExistingTableModal}
        />
      </SheetContent>
    </Sheet>
  );
};
