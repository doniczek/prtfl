import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Miłosz Strzałkowski | Full Stack Developer",
  description: "portfolio of Miłosz Strzałkowski, a Full Stack Developer specializing in TypeScript, React, Next.js and modern web technologies.",
  keywords: ["developer", "full stack", "typescript", "react", "next.js", "portfolio"],
  authors: [{ name: "Miłosz Strzałkowski" }],
  creator: "Miłosz Strzałkowski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
