import { ExternalLinkIcon, LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="sticky top-0 z-30 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <div className="flex gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ExternalLinkIcon className="h-6 w-6" />
            <span className="font-bold">WorthyQuotes.</span>
          </Link>
          <nav>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        {user ? (
          <SignedIn>
            <UserButton />
          </SignedIn>
        ) : (
          <SignedOut>
            <SignInButton mode="modal">
              <LogIn className="hover:cursor-pointer" />
            </SignInButton>
          </SignedOut>
        )}
      </div>
    </div>
  );
};

export default Navbar;
