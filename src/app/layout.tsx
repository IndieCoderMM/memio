import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Flip, ToastContainer } from "react-toastify";
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
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </body>
    </html>
  );
}
