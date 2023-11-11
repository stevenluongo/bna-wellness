"use client";

import { useNavbarStore } from "@/lib/store";
import ExpandedNavbar from "./expanded";
import StandardNavbar from "./standard";

export default function Navbar() {
  const isOpen = useNavbarStore((state) => state.isOpen);

  return (
    <nav className="bg-white h-full box-border select-none">
      {isOpen ? <ExpandedNavbar /> : <StandardNavbar />}
    </nav>
  );
}
