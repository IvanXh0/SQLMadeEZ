import { Button } from "@/components/ui/button";
import { CodeIcon } from "@/icons/code-icon";
import { DatabaseIcon } from "@/icons/database-icon";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                SQL Generation Made Easy
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Simplify the process of writing SQL code with our powerful and
                intuitive tool.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                variant="default"
                size="lg"
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-md font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                <Link href="#">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Streamline Your SQL Workflow
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform offers a range of tools to simplify the process of
                writing SQL code, from generating tables to inserting data and
                more.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="grid gap-1">
              <div className="flex items-center gap-3">
                <DatabaseIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <h3 className="text-lg font-bold">Generate Tables</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Easily create database tables with our intuitive table
                generation tool.
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-3">
                <DatabaseIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <h3 className="text-lg font-bold">Insert Data</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Streamline the process of inserting data into your database
                tables.
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-3">
                <CodeIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <h3 className="text-lg font-bold">SQL Tasks</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Simplify a wide range of SQL tasks with our comprehensive tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <Link href="#">Features</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Integrations</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#">About</Link>
            <Link href="#">Team</Link>
            <Link href="#">Careers</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#">Blog</Link>
            <Link href="#">Documentation</Link>
            <Link href="#">Support</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Sales</Link>
            <Link href="#">Partnerships</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
