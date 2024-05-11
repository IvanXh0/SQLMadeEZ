import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSidebarStore } from "@/hooks/sidebarStore";
import { Menu } from "lucide-react";

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
