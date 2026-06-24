import type { ReactNode } from "react";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { RoleAppHeader } from "@/components/workspace/role-app-header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRole="ADMIN">
      <RoleAppHeader role="ADMIN" />
      {children}
      <MobileBottomNav workspaceWide />
    </ProtectedRoute>
  );
}
