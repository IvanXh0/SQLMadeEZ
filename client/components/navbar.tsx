"use client";

import { Avatar } from "./avatar";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <Avatar />
      </div>
    </div>
  );
};
