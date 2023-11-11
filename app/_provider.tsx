"use client";

import { ReactNode } from "react";
import { SessionProvider as Provider } from "next-auth/react";
import App from "./_app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <ToastContainer />
      <App>{children}</App>
    </Provider>
  );
}
