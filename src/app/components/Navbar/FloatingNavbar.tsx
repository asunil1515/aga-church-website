"use client";
import * as React from "react";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";

const navItems = [
  { title: "HOME", href: "/" },
  { title: "ABOUT", href: "/#about" },
  { title: "SERMONS", href: "/#sermons" },
  { title: "BELIEFS", href: "/beliefs" },
  { title: "DONATE", href: "/donate" },
  { title: "VISIT", href: "/#visit" },
] as const;

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
] as const;

// SocialLink: Use <a> not <Link> for external links (SEO/faster/semantics)
const SocialLink = React.memo(
  ({
    href,
    icon: Icon,
    iconSize,
    isFloating,
    ariaLabel,
  }: {
    href: string;
    icon: React.ElementType;
    iconSize: string;
    isFloating: boolean;
    ariaLabel: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "group relative flex items-center text-white",
        "transition-all duration-300 ease-in-out",
        !isFloating && ["py-[2.25rem] -my-[2.25rem]"],
        isFloating && ["p-3 -m-2", "rounded-full"]
      )}
    >
      <Icon className={cn(iconSize, "relative z-10")} />
      {!isFloating ? (
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
            "bg-white transition-all duration-300 ease-out",
            "group-hover:w-full",
            "bottom-[1.4rem]"
          )}
          aria-hidden="true"
        />
      ) : (
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
          aria-hidden="true"
        />
      )}
    </a>
  )
);
SocialLink.displayName = "SocialLink";

export const FloatingNavbar: React.FC = React.memo(() => (
  <nav
    className="hidden lg:flex items-center"
    aria-label="Floating Desktop Navigation"
    role="navigation"
    itemScope
    itemType="http://schema.org/SiteNavigationElement"
  >
    <NavigationMenu>
      <NavigationMenuList className={cn("gap-[1.85rem] space-x-0", "lg:gap-4")}>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href} className="relative isolate">
            <Link
              href={item.href}
              aria-label={`Navigate to ${item.title}`}
              className={cn(
                "group/link",
                "text-white no-underline inline-block relative",
                "text-[0.9rem] transition-all duration-300 ease-in-out",
                "hover:text-gray-350",
                "bg-transparent hover:bg-transparent focus:bg-transparent",
                "data-[state=open]:bg-transparent",
                "py-3 px-3 rounded-full"
              )}
            >
              <span className="relative z-10">{item.title}</span>
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
                aria-hidden="true"
              />
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
    <div className={cn("flex gap-[1.65rem] ml-8", "lg:ml-6 gap-[1.75rem]")}>
      {socialLinks.map((link) => (
        <SocialLink key={link.href} {...link} isFloating={true} />
      ))}
    </div>
  </nav>
));
FloatingNavbar.displayName = "FloatingNavbar";
