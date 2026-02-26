"use client";

import { ToastItem } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[320px] flex-col gap-2">
      {toasts.map((item) => (
        <div key={item.id} className="pointer-events-auto">
          <ToastItem title={item.title} onClose={() => dismiss(item.id)} />
        </div>
      ))}
    </div>
  );
}