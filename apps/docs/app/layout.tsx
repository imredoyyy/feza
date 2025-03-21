import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: {
    template: "%s | Feza",
    default: "Feza - A open-source and modern WYSIWYG editor",
  },
  description:
    "A free, open-source and modern WYSIWYG editor built on Tiptap, Tailwind CSS and shadcn/ui.",
  openGraph: {
    url: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning className="!scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-dvh font-sans text-foreground bg-background`}
      >
        <RootProvider
          theme={{
            enableSystem: true,
            defaultTheme: "dark",
            disableTransitionOnChange: true,
          }}
        >
          {children}
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
