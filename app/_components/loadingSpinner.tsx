"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-10 w-full items-center justify-center">
      <Loader2 className="animate-spin text-black" />
    </div>
  );
}
