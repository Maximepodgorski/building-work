import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("min-h-screen pb-20 px-4 py-6 max-w-2xl mx-auto", className)}>
      {children}
    </main>
  );
}
