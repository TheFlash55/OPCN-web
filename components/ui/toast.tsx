"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastItemProps = {
  title: string;
  onClose: () => void;
};

export function ToastItem({ title, onClose }: ToastItemProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground shadow-lg"
      )}
    >
      <span>{title}</span>
      <button aria-label="Close toast" onClick={onClose} className="opacity-70 transition hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}