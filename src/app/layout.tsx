import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";

import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advanced CRM Dashboard",
  description: "CRM Dashboard Assignment",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      // Default to dark; the inline script below corrects this
      // before paint if the user previously chose light mode.
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        {/* Runs before hydration so the saved theme applies with no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem("crm-theme") || "dark";
                document.documentElement.classList.toggle("dark", theme === "dark");
                document.documentElement.classList.toggle("light", theme === "light");
              } catch (e) {}
            `,
          }}
        />

        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
