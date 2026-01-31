import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Building Work - Quiz Bien-être",
  description: "Application de quiz multijoueur axée sur le bien-être au travail",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Building Work"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full overflow-hidden">
      <body className={`${inter.className} h-full overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden pb-16">
            {children}
          </div>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
