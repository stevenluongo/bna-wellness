"use client";

import { useNavbarStore } from "@/lib/store";
import { signOut, useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import Person from "@/public/icons/person.svg";
import Logout from "@/public/icons/u_sign-out-alt.svg";
import Settings from "@/public/icons/u_setting.svg";
import Link from "next/link";
import { navItems } from "./data";

export default function ExpandedNavbar() {
  const { data: session } = useSession();

  const toggle = useNavbarStore((state) => state.toggle);

  const pathname = usePathname();

  return (
    <div className="fixed w-[260px] h-full p-5 box-border flex flex-col justify-between">
      <div className="flex flex-col gap-y-5">
        <span
          className="flex gap-3 items-center p-2 h-[60px] cursor-pointer"
          onClick={toggle}
        >
          <Image src="/logo.svg" alt="logo" width={28} height={28} />
          <p className="font-inter font-[600] text-2xl text-[#324054] tracking-tight">
            Bna
          </p>
        </span>
        <div className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.alt}
                href={item.href}
                className={twMerge(
                  "p-3 rounded flex gap-x-4 items-center cursor-pointer hover:bg-[#EFF6FF] hover:text-[#2D68FE] hover:fill-[#2D68FE]",
                  `${
                    isActive
                      ? "text-[#2D68FE] bg-[#EFF6FF]"
                      : "text-[#324054] bg-transparent"
                  }`
                )}
              >
                {item.icon}
                <p className="font-inter leading-5 font-[500]">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        {session?.user ? (
          <>
            <div
              className={twMerge(
                "p-3 rounded flex gap-x-4 items-center cursor-pointer hover:bg-[#EFF6FF] hover:text-[#2D68FE] hover:fill-[#2D68FE]"
              )}
            >
              <Settings />
              <p className="font-inter leading-5 font-[500]">Settings</p>
            </div>
            <div
              className={twMerge(
                "p-3 rounded flex gap-x-4 items-center cursor-pointer hover:bg-[#EFF6FF] hover:text-[#2D68FE] hover:fill-[#2D68FE]"
              )}
              onClick={() => signOut()}
            >
              <Logout />
              <p className="font-inter leading-5 font-[500]">Logout</p>
            </div>
            <div className="flex gap-2 items-center">
              <Person />
              <span>
                <p className="text-[#324054] text-xs">
                  {session.user.firstName} {session.user.lastName}
                </p>
                <p className="text-[#71839B] text-xs">{session.user.role}</p>
              </span>
            </div>
          </>
        ) : (
          <div
            className={twMerge(
              "p-3 rounded flex gap-x-4 items-center cursor-pointer hover:bg-[#EFF6FF] hover:text-[#2D68FE] hover:fill-[#2D68FE]"
            )}
            onClick={() => signIn()}
          >
            <Logout />
            <p className="font-inter leading-5 font-[500]">Signin</p>
          </div>
        )}
      </div>
    </div>
  );
}
