"use client";

import Navbar from "@/components/navbar/navbar";
import { useNavbarStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function App({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isOpen = useNavbarStore((state) => state.isOpen);

  if (status === "loading") return <div>Loading...</div>;
  return (
    <main className={inter.variable}>
      <div
        className={twMerge(
          "w-screen min-h-screen grid",
          `${isOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[84px_1fr]"}`
        )}
      >
        <Navbar />
        <div className="w-full bg-[#f7f7f7]">{children}</div>
      </div>
    </main>
  );
}
