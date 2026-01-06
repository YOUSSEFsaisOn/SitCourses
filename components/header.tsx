"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";

const categories = [
  "Development",
  "Business",
  "Design",
  "Marketing",
  "IT & Software",
  "Personal Development",
  "Photography",
  "Music",
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                L
              </span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:block">
              LearnHub
            </span>
          </Link>

          {/* Categories Dropdown - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button variant="ghost" className="gap-1">
                Categories
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem key={category} asChild>
                  <Link
                    href={`/courses?category=${category
                      .toLowerCase()
                      .replace(/ & /g, "-")}`}
                  >
                    {category}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for courses..."
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {user?.role === "instructor" && (
              <Link href="/instructor/dashboard" className="hidden lg:block">
                <Button variant="ghost" size="sm">
                  Instructor
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.name || "User"}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </Button>
                <Button size="sm" onClick={() => router.push("/register")}>
                  Sign up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for courses..."
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Categories
              </p>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/courses?category=${category
                    .toLowerCase()
                    .replace(/ & /g, "-")}`}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.name}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/register">Sign up</Link>
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
