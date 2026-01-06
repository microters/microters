"use client";

import { usePathname } from "next/navigation";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}    
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}