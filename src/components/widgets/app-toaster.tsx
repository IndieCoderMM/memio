"use client";

import { useAppStore } from "@/lib/app-store";
import { Flip, ToastContainer } from "react-toastify";

export default function AppToaster() {
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  return (
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
      theme={isDarkMode ? "dark" : "light"}
      transition={Flip}
      toastClassName="pouf-toast"
    />
  );
}
