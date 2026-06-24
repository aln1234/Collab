import type { ReactNode } from "react";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { RoleAppHeader } from "@/components/workspace/role-app-header";

export default function BrandLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRole="BRAND">
      <RoleAppHeader role="BRAND" />
      {children}
      <MobileBottomNav workspaceWide />
    </ProtectedRoute>
  );
}
