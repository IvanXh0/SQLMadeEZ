import { ReactNode } from "react";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center mt-40 align-center">
      {children}
    </div>
  );
}
