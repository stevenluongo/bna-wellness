"use client";

import { signOut, useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-[grey] flex h-[60px] items-center gap-x-8">
      {session?.user && <h1>Welcome Back, {session.user.username}</h1>}
      <Link href="/">Home</Link>
      {!session?.user && <Link href="/register">Register</Link>}
      <Link href="/terminal">Terminal</Link>
      <Link href="/clients">Clients</Link>
      <button onClick={() => (session?.user ? signOut() : signIn())}>
        {session?.user ? "logout" : "signin"}
      </button>
    </nav>
  );
}
