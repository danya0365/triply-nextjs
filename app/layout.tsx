import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Triply | แพลตฟอร์มจองที่พักและวางแผนการเดินทาง",
  description:
    "วางแผนการเดินทางที่สมบูรณ์แบบกับ Triply จองที่พัก วางแผนทริป และรับรางวัลทุกการเดินทาง พร้อมระบบ Goals, Missions และ Achievements",
  keywords: [
    "จองที่พัก",
    "วางแผนเที่ยว",
    "ท่องเที่ยว",
    "โรงแรม",
    "รีสอร์ท",
    "Triply",
    "travel planning",
    "accommodation booking",
    "trip planner",
    "rewards",
  ],
  authors: [{ name: "Triply Team" }],
  creator: "Marosdee Uma",
  publisher: "Triply",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    shortcut: ["/favicon/favicon.ico"],
    apple: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Triply | แพลตฟอร์มจองที่พักและวางแผนการเดินทาง",
    description:
      "วางแผนการเดินทางที่สมบูรณ์แบบ จองที่พัก และรับรางวัลทุกการเดินทาง",
    type: "website",
    siteName: "Triply",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Triply - Travel Planning & Accommodation Booking",
      },
    ],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triply | แพลตฟอร์มจองที่พักและวางแผนการเดินทาง",
    description:
      "วางแผนการเดินทางที่สมบูรณ์แบบ จองที่พัก และรับรางวัลทุกการเดินทาง",
    images: ["/og-image.svg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Triply",
  },
};

import { MainLayout } from "@/src/presentation/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
