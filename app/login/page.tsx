"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      router.push("/dashboard");
    } else {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-violet-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
              Triply
            </h1>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            เข้าสู่ระบบเพื่อวางแผนทริปของคุณ
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            เข้าสู่ระบบ
          </h2>

          {/* Demo Accounts Info */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              🔐 บัญชีทดสอบ (ทั้งหมด 50+ users):
            </p>
            <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <div className="font-semibold mb-1">🇹🇭 Thai User:</div>
              <div>📧 somchai@example.com</div>
              <div>🔑 password123</div>
              <div className="mt-2 font-semibold mb-1">🌍 International User:</div>
              <div>📧 sarah.johnson@example.com</div>
              <div>🔑 password123</div>
              <div className="mt-2 text-blue-600 dark:text-blue-300">
                💡 หรือใช้ user3@example.com ถึง user50@example.com (password: password123)
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-sky-400 to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">หรือ</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              ยังไม่มีบัญชี?{" "}
              <Link
                href="/register"
                className="text-sky-600 dark:text-sky-400 font-semibold hover:underline"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ← กลับหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
