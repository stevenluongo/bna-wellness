"use client";

import { signOut, useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-[grey] flex justify-between h-[60px] items-center">
      {session?.user && <h1>Welcome Back, {session.user.username}</h1>}
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/posts">Posts</Link>
      <button onClick={() => (session?.user ? signOut() : signIn())}>
        {session?.user ? "logout" : "signin"}
      </button>
    </nav>
  );
}
