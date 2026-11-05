
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, Mail } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserProfile() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed!");
        return;
      }

      toast.success("Logged out successfully!");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-xl font-semibold">
              Login Required
            </h2>
            <p className="text-sm text-muted-foreground">
              Please login to view your profile.
            </p>
            <Button
              type="button"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userInitial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="studio-container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-lg overflow-hidden rounded-2xl border-border shadow-lg">
        <CardHeader className="border-b border-border bg-muted/30 py-6 text-center">
          <CardTitle className="text-2xl font-bold">
            My Profile
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your StudioSpace account information
          </p>
        </CardHeader>

        <CardContent className="space-y-7 p-6 sm:p-8">
          {/* User Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="size-28 border-4 border-primary/20 shadow-md">
              <AvatarImage
                src={user.image || ""}
                alt={user.name || "User"}
              />
              <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                {userInitial}
              </AvatarFallback>
            </Avatar>

            {/* User Name */}
            <h2 className="text-xl font-bold">
              {user.name || "StudioSpace User"}
            </h2>
          </div>

          {/* Email Address */}
          <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Email Address
              </p>
              <p className="truncate text-sm font-medium">
                {user.email}
              </p>
            </div>
          </div>

          {/* My Listings */}
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={() => router.push("/my-listings")}
          >
            <LayoutDashboard size={18} />
            My Listings
          </Button>

          {/* Logout */}
          <Button
            type="button"
            variant="destructive"
            size="lg"
            className="w-full"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut size={18} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
