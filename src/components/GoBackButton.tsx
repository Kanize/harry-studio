
"use client";

import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 font-semibold transition-colors hover:bg-muted"
    >
      <ArrowLeft size={18} />
      Go Back
    </button>
  );
}
