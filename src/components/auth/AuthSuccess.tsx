"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function AuthSuccess() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (session?.user) {
      toast.success("Google authentication successful!");
      router.replace("/");
    } else {
      toast.error("Authentication failed. Please try again.");
      router.replace("/login");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-3 text-center">
        <span className="loading loading-spinner loading-lg" />

        <p className="text-muted-foreground">
          Completing your authentication...
        </p>
      </div>
    </div>
  );
}