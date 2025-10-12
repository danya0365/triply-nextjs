"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../common/ThemeToggle";
import { useAuthStore } from "@/src/store/authStore";

/**
 * Main navigation bar with links and user actions
 */
export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "หน้าแรก", icon: "🏠" },
    { href: "/accommodations", label: "ค้นหาที่พัก", icon: "🏨" },
    { href: "/trip-planner", label: "วางแผนทริป", icon: "🗺️" },
    { href: "/gamification", label: "Gamification", icon: "🎮" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-3xl transform group-hover:scale-110 transition-transform">
              ✈️
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              Triply
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section - Theme Toggle, Auth & Notifications */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="text-2xl">🔔</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-300 to-violet-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.displayName?.[0] || "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate hidden lg:block">
                      {user?.displayName || "User"}
                    </span>
                    <span className="text-sm">▼</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        🏆 Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        👤 โปรไฟล์
                      </Link>
                      <Link
                        href="/bookings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        📋 การจองของฉัน
                      </Link>
                      <Link
                        href="/calendar"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        📅 ปฏิทิน
                      </Link>
                      <Link
                        href="/trips"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        🗺️ ทริปของฉัน
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                      >
                        🚪 ออกจากระบบ
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-gradient-to-r from-sky-300 to-violet-300 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-transform ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-opacity ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-transform ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            {/* Mobile Theme Toggle */}
            <div className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">โหมด</span>
              <ThemeToggle className="p-0" />
            </div>

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                >
                  🏆 Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👤 โปรไฟล์
                </Link>
                <Link
                  href="/bookings"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📋 การจองของฉัน
                </Link>
                <Link
                  href="/calendar"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📅 ปฏิทิน
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-red-600 dark:text-red-400"
                >
                  🚪 ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 text-white rounded-lg text-center"
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
