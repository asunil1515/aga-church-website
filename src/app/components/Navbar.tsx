// components/layout/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "../components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";

interface NavbarProps {
  variant?: "default" | "opaque" | "YHWH";
  bagItemCount?: number;
}

export function Navbar({ variant = "default", bagItemCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "HOME", href: "/" },
    { title: "ABOUT", href: "/#about" },
    { title: "SERMONS", href: "/#sermons" },
    { title: "DONATE", href: "/donate" },
    { title: "APPAREL", href: "/apparel" },
    { title: "VISIT", href: "/#visit" },
  ];

  const NavigationContent = ({
    isFloating = false,
  }: {
    isFloating?: boolean;
  }) => (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn("hidden lg:flex items-center", isFloating && "lg:gap-2")}
      >
        <NavigationMenu>
          <NavigationMenuList
            className={cn("gap-[1.85rem] space-x-0", isFloating && "lg:gap-4")}
          >
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href} className="relative isolate">
                <Link
                  href={item.href}
                  className={cn(
                    "group/link",
                    "text-white no-underline inline-block relative",
                    "text-[0.9rem] transition-all duration-300 ease-in-out",
                    "hover:text-gray-350",
                    "bg-transparent hover:bg-transparent focus:bg-transparent",
                    "data-[state=open]:bg-transparent",

                    // Regular navbar styles
                    !isFloating && [
                      "py-[2.25rem] -mt-[1.1rem] -mb-[1.4rem] px-0",
                    ],

                    // Floating navbar styles
                    isFloating && ["py-3 px-3", "rounded-full"]
                  )}
                >
                  <span className="relative z-10">{item.title}</span>

                  {/* Regular navbar - underline effect*/}
                  {!isFloating && (
                    <span
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
                        "bg-white transition-all duration-300 ease-out",
                        "group-hover/link:w-full",
                        "opacity-0 group-hover/link:opacity-100",
                        "bottom-[1.4rem]"
                      )}
                    />
                  )}
                  {/* Floating navbar - bubble effect */}
                  {isFloating && (
                    <span
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "h-9 w-[calc(100%+0.75rem)]",
                        "rounded-full",
                        "bg-white/0 group-hover/link:bg-white/10",
                        "scale-0 group-hover/link:scale-100",
                        "transition-all duration-300 ease-out",
                        "origin-center"
                      )}
                    />
                  )}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Social Icons */}
        <div
          className={cn(
            "flex gap-[1.65rem] ml-8",
            isFloating && "lg:ml-6 gap-[1.75rem]"
          )}
        >
          <Link
            href="#"
            className={cn(
              "group relative flex items-center text-white",
              "transition-all duration-300 ease-in-out",
              !isFloating && ["py-[2.25rem] -my-[2.25rem]"],
              isFloating && ["p-3 -m-2", "rounded-full"]
            )}
          >
            <AiOutlineYoutube className="size-6 relative z-10" />
            {!isFloating && (
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
                  "bg-white transition-all duration-300 ease-out",
                  "group-hover:w-full",
                  "bottom-[1.4rem]"
                )}
              />
            )}
            {isFloating && (
              <span
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                  "h-9 w-12",
                  "rounded-full",
                  "bg-white/0 group-hover:bg-white/10",
                  "scale-0 group-hover:scale-100",
                  "transition-all duration-300 ease-out",
                  "origin-center"
                )}
              />
            )}
          </Link>

          <Link
            href="#"
            className={cn(
              "group relative flex items-center text-white",
              "transition-all duration-300 ease-in-out",
              !isFloating && ["py-[2.25rem] -my-[2.25rem]"],
              isFloating && ["p-3 -m-2", "rounded-full"]
            )}
          >
            <BsInstagram className="size-5 relative z-10" />
            {!isFloating && (
              <span
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
                  "bg-white transition-all duration-300 ease-out",
                  "group-hover:w-full",
                  "bottom-[1.4rem]"
                )}
              />
            )}
            {isFloating && (
              <span
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                  "h-9 w-12",
                  "rounded-full",
                  "bg-white/0 group-hover:bg-white/10",
                  "scale-0 group-hover:scale-100",
                  "transition-all duration-300 ease-out",
                  "origin-center"
                )}
              />
            )}
          </Link>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Base Navbar - slide up effect */}
      <header
        className={cn(
          "fixed top-0 w-full z-[999] bg-transparent py-1 px-5",
          "flex justify-end items-center",
          "transition-transform duration-500 ease-out",
          isScrolled ? "-translate-y-full" : "translate-y-0",
          (variant === "opaque" || variant === "YHWH") && "lg:z-[10000]"
        )}
      >
        <div className="flex items-center justify-end w-full max-w-[1400px]">
          <NavigationContent />
        </div>
      </header>

      {/* Floating Navbar - slide down effect */}
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-[1000]",
          "transition-transform duration-500 ease-out",
          isScrolled ? "translate-y-0" : "-translate-y-[200%]"
        )}
      >
        <div
          className={cn(
            "bg-[rgba(12,12,12,0.97)]",
            "rounded-full px-8 py-2",
            "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
            "backdrop-blur-md",
            "border border-white/5"
          )}
        >
          <NavigationContent isFloating={true} />
        </div>
      </header>

      {/* Mobile Menu Toggle */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden flex items-center justify-center",
              "fixed left-4 top-4 z-[1001]",
              "bg-black text-white rounded-[5px]",
              "size-auto p-2",
              "hover:bg-black hover:text-white",
              "[&_svg]:size-8",
              // sliding animation
              "transition-all duration-500 ease-out",
              isMobileMenuOpen && "-translate-x-[calc(100%+1rem)] opacity-0"
            )}
          >
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className={cn(
            "w-[min(70vw,25rem)] bg-[rgba(12,12,12,0.97)]",
            "pt-24 px-8 pb-8",
            "shadow-[4px_0_24px_-2px_rgba(0,0,0,0.3),8px_0_48px_-4px_rgba(0,0,0,0.2)]",
            "z-[1002]"
          )}
        >
          {/* Visually hidden title for accessibility */}
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "flex items-center justify-center",
              "absolute left-4 top-4 z-[10]",
              "bg-black text-white rounded-[5px]",
              "size-auto p-2",
              "hover:bg-black hover:text-white",
              "[&_svg]:size-8"
            )}
          >
            <X />
          </Button>

          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-2 text-left">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-white py-2 text-[clamp(0.5rem,5.5vw,1.5rem)]",
                  "transition-all duration-300",
                  "hover:text-[rgb(199,199,199)]"
                )}
              >
                {item.title}
              </Link>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex gap-5 mt-2">
              <Link
                href="#"
                className="text-white hover:text-gray-300 transition-all duration-300"
              >
                <AiOutlineYoutube className="size-7 translate-y-[-1px]" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-300 transition-all duration-300"
              >
                <BsInstagram className="size-6" />
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
