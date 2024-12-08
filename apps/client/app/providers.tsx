"use client";

import { useUserStore } from "@/stores/user.store";
import api from "@/utils/api";
import { Me } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  const { user } = useUser();
  const hydrateUser = useUserStore((state) => state.hydrateUser);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      try {
        const { data } = await api.get<Me>(`/user/${email}`);
        hydrateUser(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, [user, hydrateUser]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
