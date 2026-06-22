import type { ReactNode } from "react";

import { ProtectedRoute } from "@/components/auth/protected-route";

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRole="CREATOR">{children}</ProtectedRoute>;
}
