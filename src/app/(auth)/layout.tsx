import Logo from "@/components/logo";
import { Citrus, Leaf } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side - Decorative Panel (hidden on mobile) */}
      <div className="relative hidden overflow-hidden bg-linear-to-br from-grove-green via-grove-green-dark to-grove-green lg:block">
        {/* Decorative blurs */}
        <div className="absolute -left-20 -top-20 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-80 rounded-full bg-grove-orange/20 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 size-64 rounded-full bg-grove-orange/10 blur-3xl" />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-10">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2.5">
            <Logo width={120} height={40} />
          </Link>

          {/* Center content */}
          <div className="flex flex-col items-center justify-center">
            <h1>Image Placeholder</h1>
          </div>

          {/* Bottom quote */}
          <div className="flex items-start gap-3 rounded-xl bg-muted p-5 backdrop-blur-sm">
            {/*<Leaf className="mt-0.5 size-5 shrink-0 text-grove-orange-light" />*/}
            <blockquote className="text-sm leading-relaxed text-foreground">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”
              <footer className="mt-2 text-xs text-primary-foreground">
                — Lorem Ipsum{" "}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right side - Form area */}
      <div className="relative flex flex-col">
        {/* Mobile header */}
        <div className="flex items-center justify-center border-b border-border/40 p-4 lg:hidden">
          <Link href="/logo" className="flex items-center gap-2">
            <Image
              src="/scg-logo.png"
              alt="SCG Logo"
              width={120}
              height={40}
              loading="eager"
            />
          </Link>
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 px-4 py-4 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
