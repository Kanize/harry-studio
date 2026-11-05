"use client";

import { useRouter } from "next/navigation";
import {
  ChevronDown,
  PlusCircle,
  LayoutDashboard,
  CalendarDays,
  Heart,
  LogOut,
  UserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

type UserMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onLogout: () => void;
  isLoggingOut?: boolean;
  mobile?: boolean;
};

export default function UserMenu({
  user,
  onLogout,
  isLoggingOut = false,
  mobile = false,
}: UserMenuProps) {
  const router = useRouter();

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-2.5 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          mobile && "w-full justify-start rounded-lg",
        )}
      >
        <Avatar className="size-7">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            {initial}
          </AvatarFallback>
        </Avatar>

        <span className="max-w-28 truncate text-sm font-medium">
          {user.name || "My Account"}
        </span>

        <ChevronDown size={15} className="text-muted-foreground" />
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={10}
        className="z-[9999] w-64 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl"
      >
        {/* User Information */}
        <DropdownMenuLabel className="px-3 py-2 font-normal">
          <p className="text-xs text-muted-foreground">Signed in as</p>

          <p className="mt-1 truncate text-sm font-semibold">
            {user.name || "StudioSpace User"}
          </p>

          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* My Profile */}
        <DropdownMenuItem
          onClick={() => {
            router.push("/profile");
          }}
          className="cursor-pointer gap-3 py-2.5"
        >
          <UserRound size={16} />
          My Profile
        </DropdownMenuItem>

        {/* Add New Studio */}
        <DropdownMenuItem
          onClick={() => {
            router.push("/addStudio");
          }}
          className="cursor-pointer gap-3 py-2.5"
        >
          <PlusCircle size={16} className="text-primary" />
          Add New Studio
        </DropdownMenuItem>

        {/* My Studio Listings */}
        <DropdownMenuItem
          onClick={() => router.push("/my-listings")}
          className="cursor-pointer gap-3 py-2.5"
        >
          <LayoutDashboard size={16} />
          My Studio Listings
        </DropdownMenuItem>

        {/* My Bookings */}
        <DropdownMenuItem
          onClick={() => router.push("/my-bookings")}
          className="cursor-pointer gap-3 py-2.5"
        >
          <CalendarDays size={16} />
          My Bookings
        </DropdownMenuItem>

        {/* Saved Wishlist */}
        <DropdownMenuItem
          onClick={() => router.push("/wishlist")}
          className="cursor-pointer gap-3 py-2.5"
        >
          <Heart size={16} />
          Saved Wishlist
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={onLogout}
          disabled={isLoggingOut}
          className="cursor-pointer gap-3 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut size={16} />
          {isLoggingOut ? "Signing out..." : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
