"use client";

import { useNavbarStore } from "@/lib/store";
import ExpandedNavbar from "./expanded";
import StandardNavbar from "./standard";

export default function Navbar() {
  const isOpen = useNavbarStore((state) => state.isOpen);

  return (
    <nav className="w-full bg-white p-5 text-black h-full box-border flex flex-col justify-between select-none">
      {isOpen ? <ExpandedNavbar /> : <StandardNavbar />}
    </nav>
  );
}
