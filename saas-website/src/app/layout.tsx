import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

export const metadata: Metadata = {
  title: "DevAIO — AI-Powered Business Automation Platform",
  description:
    "Transform your business with DevAIO's cutting-edge AI automation platform. Build intelligent workflows, deploy AI agents, and scale operations with the power of artificial intelligence.",
  keywords: [
    "AI automation",
    "AI SaaS",
    "business automation",
    "AI agents",
    "workflow automation",
    "CRM AI",
    "DevAIO",
  ],
  authors: [{ name: "DevAIO Team" }],
  openGraph: {
    title: "DevAIO — AI-Powered Business Automation Platform",
    description:
      "Transform your business with DevAIO's cutting-edge AI automation platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevAIO — AI-Powered Business Automation Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@300;400;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050816] text-slate-100 antialiased">
        <AuthProvider>
          {children}
          {/* Global Auth Modal — rendered at root level */}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
