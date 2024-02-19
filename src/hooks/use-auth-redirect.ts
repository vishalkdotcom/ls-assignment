import * as React from "react";

import { usePathname, useRouter } from "next/navigation";

import { isLoggedIn } from "@/lib/auth";

export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.startsWith("/auth") && isLoggedIn()) {
      router.push("/");
    }
    // else if (!pathname.startsWith("/auth") && !isLoggedIn()) {
    //   router.push("/auth/login");
    // }
  }, []);
}
