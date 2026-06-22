import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import Toast from "react-native-toast-message";

import { ScreenContainer } from "../src/components/layout/screen-container";
import { LoadingState } from "../src/components/ui/loading-state";
import { queryClient } from "../src/lib/query-client";
import { getDashboardPath, useAuthStore } from "../src/stores/auth-store";

function AuthGate() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();
  const didHydrate = useRef(false);

  const { hydrateAuth, isAuthenticated, isHydrated, user } = useAuthStore();

  useEffect(() => {
    if (didHydrate.current) return;

    didHydrate.current = true;
    void hydrateAuth();
  }, [hydrateAuth]);

  useEffect(() => {
    if (!isHydrated) return;

    const currentGroup = segments[0];

    const isHomeRoute = pathname === "/";

    const isAuthRoute = currentGroup === "(auth)";
    const isBrandRoute = currentGroup === "(brand)";
    const isCreatorRoute = currentGroup === "(creator)";
    const isAdminRoute = currentGroup === "(admin)";

    const isProtectedRoute = isBrandRoute || isCreatorRoute || isAdminRoute;

    /**
     * NOT LOGGED IN
     *
     * Allow:
     * - Home/welcome page: /
     * - Login/register pages: /(auth)/login, /(auth)/register
     *
     * Block:
     * - Brand/creator/admin pages
     */
    if (!isAuthenticated) {
      if (isHomeRoute || isAuthRoute) {
        return;
      }

      if (isProtectedRoute) {
        router.replace("/");
      }

      return;
    }

    /**
     * LOGGED IN BUT USER DATA NOT READY YET
     */
    if (!user) return;

    const dashboardPath = getDashboardPath(user.role);

    const isCorrectRoleRoute =
      (user.role === "BRAND" && isBrandRoute) ||
      (user.role === "CREATOR" && isCreatorRoute) ||
      (user.role === "ADMIN" && isAdminRoute);

    /**
     * LOGGED IN
     *
     * Redirect from:
     * - Home page
     * - Login/register page
     * - Wrong dashboard
     *
     * To correct role dashboard.
     */
    if (isHomeRoute || isAuthRoute || !isCorrectRoleRoute) {
      router.replace(dashboardPath);
    }
  }, [isAuthenticated, isHydrated, pathname, router, segments, user]);

  if (!isHydrated) {
    return (
      <ScreenContainer centered scroll={false}>
        <LoadingState message="Preparing Connect..." />
      </ScreenContainer>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <AuthGate />
      <Toast />
    </QueryClientProvider>
  );
}
