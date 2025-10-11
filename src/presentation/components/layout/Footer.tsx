"use client";

import Link from "next/link";

/**
 * Footer Component (Organism)
 * Site-wide footer with links, info, and social media
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: "บริษัท",
      links: [
        { href: "/about", label: "เกี่ยวกับเรา" },
        { href: "/careers", label: "ร่วมงานกับเรา" },
        { href: "/press", label: "ข่าวสาร" },
        { href: "/blog", label: "บล็อก" },
      ],
    },
    support: {
      title: "ช่วยเหลือ",
      links: [
        { href: "/help", label: "ศูนย์ช่วยเหลือ" },
        { href: "/faq", label: "คำถามที่พบบ่อย" },
        { href: "/contact", label: "ติดต่อเรา" },
        { href: "/safety", label: "ความปลอดภัย" },
      ],
    },
    services: {
      title: "บริการ",
      links: [
        { href: "/accommodations", label: "ค้นหาที่พัก" },
        { href: "/trip-planner", label: "วางแผนทริป" },
        { href: "/rewards", label: "รางวัลและสิทธิพิเศษ" },
        { href: "/host", label: "ลงทะเบียนที่พัก" },
      ],
    },
    legal: {
      title: "กฎหมาย",
      links: [
        { href: "/terms", label: "ข้อกำหนดการใช้งาน" },
        { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
        { href: "/cookies", label: "นโยบายคุกกี้" },
        { href: "/cancellation", label: "นโยบายการยกเลิก" },
      ],
    },
  };

  const socialLinks = [
    { icon: "📘", label: "Facebook", href: "#" },
    { icon: "📷", label: "Instagram", href: "#" },
    { icon: "🐦", label: "Twitter", href: "#" },
    { icon: "📺", label: "YouTube", href: "#" },
    { icon: "💼", label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">✈️</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">
                Triply
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              แพลตฟอร์มจองที่พักและวางแผนการเดินทางที่ดีที่สุด
              พร้อมระบบรางวัลที่คุ้มค่าทุกการเดินทาง
            </p>
            
            {/* App Download Badges */}
            <div className="flex flex-col gap-2 mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">
              รับข่าวสารและโปรโมชั่นพิเศษ
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              สมัครรับอีเมลเพื่อรับข้อเสนอพิเศษและคะแนนโบนัส 100 คะแนน
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-sky-300 to-violet-300 text-white rounded-lg hover:shadow-lg transition-all">
                สมัคร
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} Triply. All rights reserved. Made with ❤️ in Thailand
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:scale-110 transition-transform"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Language & Currency Selector */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                <span>🌐</span>
                <span>ไทย</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                <span>💰</span>
                <span>THB</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
