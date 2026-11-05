
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Aperture,
  LogIn,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";

import UserMenu from "@/components/layout/UserMenu";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
] as const;

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderContent />
    </Suspense>
  );
}

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/90 backdrop-blur-xl" />
  );
}

function HeaderContent() {
  const pathname = usePathname();

  return <HeaderNavigation key={pathname} pathname={pathname} />;
}

function HeaderNavigation({ pathname }: { pathname: string }) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Better Auth Logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed. Please try again.");
        return;
      }

      toast.success("Logged out successfully!");

      closeMenu();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 text-foreground shadow-sm backdrop-blur-xl">
      <div className="studio-container flex h-16 items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="StudioSpace home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Aperture size={20} strokeWidth={2.25} aria-hidden="true" />
          </span>

          <span className="font-heading text-lg font-bold tracking-tight">
            Studio
            <span className="text-primary">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeToggle />

          {!isPending &&
            (user ? (
              <UserMenu
                user={user}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            ) : (
              <AuthButtons />
            ))}
        </div>

        {/* Mobile Actions */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-accent"
          >
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="studio-container flex flex-col gap-1 py-4"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Auth Actions */}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              {!isPending &&
                (user ? (
                  <UserMenu
                    user={user}
                    onLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                    mobile
                  />
                ) : (
                  <AuthButtons
                    mobile
                    onClick={closeMenu}
                  />
                ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* Login and Register Buttons */
function AuthButtons({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}) {
  return (
    <>
      <Link
        href="/login"
        onClick={onClick}
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          mobile && "w-full"
        )}
      >
        <LogIn size={16} aria-hidden="true" />
        Login
      </Link>

      <Link
        href="/signup"
        onClick={onClick}
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          mobile && "w-full"
        )}
      >
        <UserPlus size={16} aria-hidden="true" />
        Register
      </Link>
    </>
  );
}
