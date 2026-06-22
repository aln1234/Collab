import type { ReactNode } from "react";

import { ProtectedRoute } from "@/components/auth/protected-route";

export default function BrandLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute allowedRole="BRAND">{children}</ProtectedRoute>;
}
