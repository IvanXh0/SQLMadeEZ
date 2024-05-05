import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./sidebar";
import { useSidebarStore } from "@/hooks/sidebarStore";

export const MobileSidebar = () => {
  const { isOpen, openSidebar, closeSidebar } = useSidebarStore();
  return (
    <Sheet open={isOpen} onOpenChange={isOpen ? closeSidebar : openSidebar}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={openSidebar}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar closeSidebar={closeSidebar} />
      </SheetContent>
    </Sheet>
  );
};
