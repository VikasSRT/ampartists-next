"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionProvider } from "@/context/DirectionContext";
import { Toaster } from "@/components/ui/toaster";
import Analytics from "@/components/GoogleAnalytics/Analytics";
import "@/utils/i18n";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <DirectionProvider>
        {children}
        <Toaster />
      </DirectionProvider>
    </QueryClientProvider>
  );
}
