"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Menu,
  MessageCircle,
  User as UserLucide,
  Home,
  LogIn,
  LogOut,
  Layers,
  Moon,
  Sun,
  Users,
} from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;

  const pathname = usePathname();
  const { setTheme } = useTheme();

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Messaging", href: "/u", icon: MessageCircle },
    { name: "About", href: "/about", icon: Users },
  ];

  const authBasedButtonGroup = () => {
    if (user) {
      return (
        <>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <Layers className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
          </Link>

          <Button
            variant="destructive"
            onClick={() => signOut()}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <LogIn className="w-4 h-4 mr-1" />
              Sign In
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200">
              Sign Up
            </Button>
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-zinc-300 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-lg">
      <div className="mx-auto w-full max-w-5xl px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Branding />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={active ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    active
                      ? "bg-zinc-800 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex gap-3">
          {/* Theme Toggle */}
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-5 w-5 dark:hidden" />
                  <Moon className="h-5 w-5 hidden dark:inline" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {authBasedButtonGroup()}
          </>
        </div>
        {/* Theme Toggle */}
        <div className="md:hidden absolute right-16">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-5 w-5 dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:inline" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden flex gap-6 items-center justify-center">
            <Menu className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              w-[260px]
              bg-zinc-50 text-zinc-800 
              dark:bg-zinc-950 dark:text-zinc-200
              border-zinc-200 dark:border-zinc-800
              px-4 py-6
            "
          >
            {/* User Info Card */}
            <div
              className="
                w-full mt-6 p-4 rounded-xl shadow-md
                bg-zinc-100 border border-zinc-200 text-zinc-800
                dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200
              "
            >
              {!session ? (
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                    Welcome!
                  </p>
                  <p className="text-sm mt-1 text-zinc-600 dark:text-zinc-400">
                    Sign in to access your profile & messages.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                    Hello, {user?.username || "User"} 👋
                  </p>

                  <p className="text-sm flex items-center gap-2 text-zinc-700 dark:text-zinc-400">
                    <UserLucide className="w-4 h-4 text-zinc-600 dark:text-zinc-500" />
                    {user?.email || "User"}
                  </p>

                  <p className="text-xs mt-2 border-t pt-2 border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500">
                    Logged in as{" "}
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {user?.username || "User"}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4 mt-10">
              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={active ? "default" : "outline"}
                      className={`
                        w-full flex items-center justify-start gap-3
                        ${
                          active
                            ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
                            : "border-zinc-300 text-zinc-700 hover:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Button>
                  </Link>
                );
              })}

              {/* Auth */}
              <div className="mt-6 flex flex-col gap-3">
                {!session ? (
                  <>
                    <Link href="/sign-in">
                      <Button
                        className="
                          w-full 
                          bg-zinc-800 text-zinc-100 hover:bg-zinc-700
                          dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300
                        "
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/sign-up">
                      <Button
                        className="
                          w-full 
                          bg-zinc-100 text-zinc-900 hover:bg-zinc-200
                          dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700
                        "
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard">
                      <Button
                        className="
                          w-full 
                          bg-zinc-100 text-zinc-900 hover:bg-zinc-200
                          dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700
                        "
                      >
                        <Layers className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;

import Image from "next/image";

export const Branding = ({ classname }: { classname?: string }) => {
  return (
    <Link href="/" className="flex items-center gap-1 select-none ">
      <Image
        src="/logo.webp" // put logo in /public
        alt="MindsViewMsg logo"
        width={20}
        height={20}
        className="rounded-full inline-block "
        priority
      />
      <span
        className={`font-bold text-xl tracking-tight text-zinc-800 dark:text-zinc-200 
         ${classname ? classname : ""}`}
      >
        MindsViewMsg
      </span>
    </Link>
  );
};
