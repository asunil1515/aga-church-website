"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../../ui/sheet";

const navItems = [
  { title: "HOME", href: "/" },
  { title: "ABOUT", href: "/#about" },
  { title: "SERMONS", href: "/#sermons" },
  { title: "BELIEFS", href: "/beliefs" },
  { title: "DONATE", href: "/donate" },
  { title: "VISIT", href: "/#visit" },
];
const socialLinks = [
  {
    href: "https://youtube.com/@amazinggraceassembly",
    icon: AiOutlineYoutube,
    iconSize: "size-6",
    ariaLabel: "YouTube Channel",
  },
  {
    href: "https://www.instagram.com/amazinggraceig/",
    icon: BsInstagram,
    iconSize: "size-5",
    ariaLabel: "Instagram Profile",
  },
];

export interface MobileNavbarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isOpen,
  onOpenChange,
}) => (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open navigation menu"
        className={cn(
          "lg:hidden flex items-center justify-center",
          "fixed left-4 top-4 z-[1001]",
          "bg-black text-white rounded-[5px]",
          "size-auto p-2",
          "hover:bg-black hover:text-white",
          "[&_svg]:size-8",
          "transition-all duration-500 ease-out",
          isOpen && "-translate-x-[calc(100%+1rem)] opacity-0"
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
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onOpenChange(false)}
        aria-label="Close navigation menu"
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

      <nav
        className="flex flex-col gap-2 text-left"
        aria-label="Mobile Navigation"
        role="navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onOpenChange(false)}
            className={cn(
              "text-white py-2 text-[clamp(0.5rem,5.5vw,1.5rem)]",
              "transition-all duration-300",
              "hover:text-[rgb(199,199,199)]"
            )}
          >
            {item.title}
          </Link>
        ))}

        <div className="flex gap-5 mt-2">
          {socialLinks.map((social) => (
            <Link
              key={social.ariaLabel}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="text-white hover:text-gray-300 transition-all duration-300"
            >
              <social.icon
                className={cn(
                  social.iconSize,
                  social.icon === AiOutlineYoutube && "translate-y-[-1px]"
                )}
              />
            </Link>
          ))}
        </div>
      </nav>
    </SheetContent>
  </Sheet>
);
