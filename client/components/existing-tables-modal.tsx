import { ExistingTablesView } from "./existing-tables-view";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface P {
  toggleExistingTableModal: () => void;
  isExistingTableModalOpen: boolean;
}

export const ExistingTablesModal = ({
  toggleExistingTableModal,
  isExistingTableModalOpen,
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
        />
      </SheetContent>
    </Sheet>
  );
};
