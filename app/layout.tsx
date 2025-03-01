import type { Metadata } from "next";
import { Londrina_Shadow } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { TranslationsProvider } from "@/components/translations-context";

const londrinaShadow = Londrina_Shadow({
  weight: "400",
  variable: "--font-londrina-shadow",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siga Studio",
  description: "Realtime Voice Driven Design Studio",
  authors: [{ name: siteConfig.author, url: siteConfig.links.twitter }],
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  keywords: ["Siga Studio", "Voice Driven Design Studio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          londrinaShadow.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationsProvider>
            <div className="relative flex min-h-dvh flex-col bg-background items-center">
              {/* <Header /> */}
              <main className="flex flex-1 w-full justify-center items-start">
                {children}
              </main>
            </div>
            <Toaster />
          </TranslationsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
