"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../login/components/authProvider";
import Link from "next/link";

export default function Dashboard({ children }) {
  const router = useRouter();
  const { auth, setAuth } = useUserContext();

  console.log("layout", auth);

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    } else {
      // Push a new state to the browser's history to prevent going back
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        // When the user tries to go back, push the current state again to prevent it
        window.history.pushState(null, null, window.location.href);
      };
    }
  }, [auth]);

  if (!auth) {
    return null; // Return appropriate content or redirect logic
  }

  const logout = () => {
    router.push("/login");
  };

  const usernames = () => {
    router.push("/username");
  };

  return (
    <div>
      Dashboard content
      <button onClick={logout}>logout</button>

      <Link prefetch href="/">
      
        <button>button theme</button>
      </Link>
      <Link prefetch href="/username">
      
        <button>username</button>
      </Link>
      <Link prefetch href="/quiz">

        <button>quiz</button>
      </Link>
      <main>{children}</main>
    </div>
  );
}
