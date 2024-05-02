import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { HomeIcon, PenToolIcon, Vault } from "lucide-react";
import { cn } from "@/lib/utils";

const monserrat = Montserrat({ subsets: ["latin"], weight: "600" });

const routes = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon className="text-violet-500" />,
  },
  {
    name: "Generate!",
    href: "/generate",
    icon: <PenToolIcon className="text-green-500" />,
  },
  {
    name: "Vault",
    href: "/vault",
    icon: <Vault className="text-red-500" />,
  },
];

export const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111826] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image src="/sqlmadeez.png" fill alt="sqlmadeez logo" />
          </div>
          <h1 className={cn(monserrat.className, "text-xl font-bold")}>
            SQLMadeEZ
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map(({ href, name, icon }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center flex-1 p-3 justify-start w-full text-sm font-medium rounded-lg hover:bg-[#1f2a44] transition"
            >
              <div className="relative w-5 h-5 mr-4">{icon}</div>
              <span className="text-white font-semibold text-md">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
