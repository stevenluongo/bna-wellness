"use client";

import { ReactNode } from "react";
import { SessionProvider as Provider } from "next-auth/react";
import App from "./_app";

export default function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <App>{children}</App>
    </Provider>
  );
}
