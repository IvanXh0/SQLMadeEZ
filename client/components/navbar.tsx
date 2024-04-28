"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Generate!",
    href: "/generate",
  },
];

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="flex justify-between max-w-4xl mx-auto inset-0 mt-2 items-center bg-transparent p-4 border border-zinc-400 rounded-full">
      <div className="flex space-x-4 text-zinc-800">
        {routes.map(({ href, name }) => (
          <Link
            className={pathname === href ? "text-violet-400" : ""}
            key={name}
            href={href}
          >
            {name}
          </Link>
        ))}
      </div>
      {isSignedIn ? (
        <div className="flex items-center space-x-4">
          <p className="hidden md:block text-lg font-semibold text-zinc-800">
            Welcome, {user.firstName}
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <Link href="/sign-in">
          <Button variant="secondary">Login</Button>
        </Link>
      )}
    </nav>
  );
};
