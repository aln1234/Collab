import type { ReactNode } from "react";

import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRole="ADMIN">{children}</ProtectedRoute>;
}
