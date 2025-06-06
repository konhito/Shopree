"use client";

import { useState } from "react";
import Link from "next/link";
// import Image from "next/image"; // Removed Image import
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth, useUser, SignOutButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation"; // Import usePathname

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const pathname = usePathname(); // Get current pathname

  const isDashboard = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Replaced Image with text */}
          <span className="text-xl font-bold text-foreground">IndiBridge</span>
          {/* 
          <Image
            src="/images/logo.png"
            alt="IndiBridge Logo"
            width={150}
            height={40}
          />
           */}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            isDashboard ? (
              // Show Account Dropdown on Dashboard page
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    title={user?.primaryEmailAddress?.emailAddress}
                  >
                    {user?.primaryEmailAddress?.emailAddress || "Account"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    {user?.primaryEmailAddress?.emailAddress}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/user">Profiles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton>Logout</SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Show Dashboard Button on other pages
              <Button
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                asChild
              >
                <Link href="/signup">Ship Now</Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Menu"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-foreground/70 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block py-2 text-foreground/70 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-foreground/70 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block py-2 text-foreground/70 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-foreground/70 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              {isSignedIn ? (
                isDashboard ? (
                  // Show Account Dropdown on Dashboard page for mobile
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        title={user?.primaryEmailAddress?.emailAddress}
                      >
                        {user?.primaryEmailAddress?.emailAddress || "Account"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>
                        {user?.primaryEmailAddress?.emailAddress}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/user" onClick={() => setIsMenuOpen(false)}>
                          Profiles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SignOutButton>Logout</SignOutButton>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // Show Dashboard Button on other pages for mobile
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    asChild
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </Button>
                )
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    asChild
                  >
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      Ship Now
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
