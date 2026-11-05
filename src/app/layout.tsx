import Navbar from "@/components/navbar";
import AppToaster from "@/components/widgets/app-toaster";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Memio - Master Your Memory",
  description: "Train your brain with memory games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen font-sans antialiased">
        <Navbar />
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
