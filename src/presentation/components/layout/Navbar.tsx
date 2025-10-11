"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Navbar Component (Organism)
 * Main navigation bar with links and user actions
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // TODO: Replace with actual auth state from Supabase
  const isAuthenticated = false;

  const navLinks = [
    { href: "/", label: "หน้าแรก", icon: "🏠" },
    { href: "/accommodations", label: "ค้นหาที่พัก", icon: "🏨" },
    { href: "/trip-planner", label: "วางแผนทริป", icon: "🗺️" },
    { href: "/rewards", label: "รางวัล", icon: "🎁" },
    { href: "/about", label: "เกี่ยวกับเรา", icon: "ℹ️" },
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
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
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
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                  <span className="text-2xl">🔔</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      U
                    </div>
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
                        href="/trips"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        🗺️ ทริปของฉัน
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
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
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all"
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
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  🏆 Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  👤 โปรไฟล์
                </Link>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-red-600">
                  🚪 ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg text-center"
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
