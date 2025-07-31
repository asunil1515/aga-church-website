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

const SocialLink = React.memo(
  ({
    href,
    icon: Icon,
    iconSize,
    isFloating,
    ariaLabel,
    textColorClass,
  }: {
    href: string;
    icon: React.ElementType;
    iconSize: string;
    isFloating: boolean;
    ariaLabel: string;
    textColorClass?: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "group relative flex items-center",
        textColorClass || "text-white", // Apply custom text color or default to white
        "transition-all duration-300 ease-in-out",
        !isFloating && ["py-[2.25rem] -my-[2.25rem]"],
        isFloating && ["p-3 -m-2", "rounded-full"]
      )}
    >
      <Icon className={cn(iconSize, "relative z-10")} />
      {!isFloating && (
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
            textColorClass ? textColorClass.replace("text-", "bg-") : "bg-white", // Match background to text color
            "transition-all duration-300 ease-out",
            "group-hover:w-full",
            "bottom-[1.4rem]"
          )}
          aria-hidden="true"
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
          aria-hidden="true"
        />
      )}
    </a>
  )
);
SocialLink.displayName = "SocialLink";

export interface BaseNavbarProps {
  textColorClass?: string; // New prop for custom text color class
}

export const BaseNavbar: React.FC<BaseNavbarProps> = React.memo(
  ({ textColorClass = "text-white" }) => (
    <nav
      className={cn("hidden lg:flex items-center")}
      aria-label="Desktop Navigation"
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <NavigationMenu>
        <NavigationMenuList className="gap-[1.85rem] space-x-0">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href} className="relative isolate">
              <Link
                href={item.href}
                className={cn(
                  "group/link",
                  "no-underline inline-block relative",
                  textColorClass, // Apply custom text color
                  "text-[0.9rem] transition-all duration-300 ease-in-out",
                  "hover:text-gray-350",
                  "bg-transparent hover:bg-transparent focus:bg-transparent",
                  "data-[state=open]:bg-transparent",
                  "py-[2.25rem] -mt-[1.1rem] -mb-[1.4rem] px-0"
                )}
              >
                <span className="relative z-10">{item.title}</span>
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
                    textColorClass
                      ? textColorClass.replace("text-", "bg-")
                      : "bg-white", // Match background to text color
                    "transition-all duration-300 ease-out",
                    "group-hover/link:w-full opacity-0 group-hover/link:opacity-100",
                    "bottom-[1.4rem]"
                  )}
                  aria-hidden="true"
                />
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-[1.65rem] ml-8">
        {socialLinks.map((link) => (
          <SocialLink
            key={link.href}
            {...link}
            isFloating={false}
            textColorClass={textColorClass}
          />
        ))}
      </div>
    </nav>
  )
);
BaseNavbar.displayName = "BaseNavbar";