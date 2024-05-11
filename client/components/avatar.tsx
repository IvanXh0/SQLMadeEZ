"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export const Avatar = () => {
  const { isSignedIn, user } = useUser();
  return isSignedIn ? (
    <div className="absolute top-0 right-0 p-6 flex flex-row space-x-3">
      <p className="hidden md:block text-lg font-semibold text-zinc-800">
        Welcome, {user.firstName}
      </p>
      <UserButton afterSignOutUrl="/" />
    </div>
  ) : (
    <div className="absolute top-0 right-0 p-6 flex flex-row space-x-3">
      <Link href="/sign-in">
        <Button variant="default">Login</Button>
      </Link>
    </div>
  );
};
