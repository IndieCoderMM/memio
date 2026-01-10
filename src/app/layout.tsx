import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Oxanium, Source_Code_Pro, Source_Serif_4 } from "next/font/google";
import { Flip, ToastContainer } from "react-toastify";
import "./globals.css";

const _oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const _sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
const _sourceSerif_4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={`relative h-full font-sans antialiased`}>
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
