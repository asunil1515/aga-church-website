"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";

// Types
interface NavbarProps {
  variant?: "default" | "opaque" | "YHWH";
  bagItemCount?: number;
  disableFloating?: boolean;
}

interface NavItem {
  title: string;
  href: string;
}

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  iconSize: string;
  isFloating: boolean;
  ariaLabel: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: NavItem[];
}

// Constants
const navItems: NavItem[] = [
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

// Social Link Component
const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon: Icon,
  iconSize,
  isFloating,
  ariaLabel,
}) => (
  <Link
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

    {!isFloating && (
      <span
        className={cn(
          "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
          "bg-white transition-all duration-300 ease-out",
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
  </Link>
);

// Custom handler for Instagram in floating navbar
const openInstagram = () => {
  window.open(
    "https://www.instagram.com/amazinggraceig/",
    "_blank",
    "noopener,noreferrer"
  );
};

// Mobile Menu Component
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onOpenChange,
  navItems,
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

      <nav className="flex flex-col gap-2 text-left">
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

// Navigation Content Component
const NavigationContent: React.FC<{ isFloating?: boolean }> = React.memo(
  ({ isFloating = false }) => (
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
                  !isFloating && [
                    "py-[2.25rem] -mt-[1.1rem] -mb-[1.4rem] px-0",
                  ],
                  isFloating && ["py-3 px-3", "rounded-full"]
                )}
              >
                <span className="relative z-10">{item.title}</span>

                {!isFloating && (
                  <span
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-0 h-[2px]",
                      "bg-white transition-all duration-300 ease-out",
                      "group-hover/link:w-full",
                      "opacity-0 group-hover/link:opacity-100",
                      "bottom-[1.4rem]"
                    )}
                    aria-hidden="true"
                  />
                )}

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
                    aria-hidden="true"
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
        {/* YouTube stays the same */}
        <SocialLink
          href="https://youtube.com/@amazinggraceassembly"
          icon={AiOutlineYoutube}
          iconSize="size-6"
          isFloating={isFloating}
          ariaLabel="YouTube Channel"
        />

        {/* Instagram handled separately for floating nav */}
        {isFloating ? (
          <a
            href="https://www.instagram.com/amazinggraceig/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className={cn(
              "group relative flex items-center text-white",
              "transition-all duration-300 ease-in-out",
              "p-3 -m-2 rounded-full"
            )}
          >
            <BsInstagram className="size-5 relative z-10" />
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
          </a>
        ) : (
          <SocialLink
            href="https://www.instagram.com/amazinggraceig/"
            icon={BsInstagram}
            iconSize="size-5"
            isFloating={false}
            ariaLabel="Instagram Profile"
          />
        )}
      </div>
    </nav>
  )
);

NavigationContent.displayName = "NavigationContent";

// Main Navbar Component
export function Navbar({
  variant = "default",
  bagItemCount = 0,
  disableFloating = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!disableFloating) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [disableFloating]);

  return (
    <>
      <header
        className={cn(
          disableFloating ? "absolute" : "fixed",
          "top-0 w-full z-[999] bg-transparent py-1 px-5",
          "flex justify-end items-center",
          "transition-transform duration-500 ease-out",
          !disableFloating && isScrolled
            ? "-translate-y-full"
            : "translate-y-0",
          (variant === "opaque" || variant === "YHWH") && "lg:z-[10000]"
        )}
      >
        <div className="flex items-center justify-end w-full max-w-[1400px]">
          <NavigationContent />
        </div>
      </header>

      {!disableFloating && (
        <header
          className={cn(
            "hidden lg:block",
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
      )}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        navItems={navItems}
      />
    </>
  );
}
