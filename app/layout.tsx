import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppSupport from "@/components/whatsapp-support";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/user-sync";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IndiBridge | Shop India, Ship Worldwide",
  description:
    "Your bridge to Indian products, no matter where you are in the world.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClerkProvider>
            <div className="relative min-h-screen flex flex-col">
              <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#FFA07A_1px,transparent_1px)] [background-size:24px_24px]"></div>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <WhatsAppSupport />
              <Footer />
            </div>
            <UserSync />
            <Toaster />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
