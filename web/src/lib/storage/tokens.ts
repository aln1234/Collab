const accessTokenKey = "connect.accessToken";
const refreshTokenKey = "connect.refreshToken";

function browserStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
}

export const tokenStorage = {
  getAccessToken() {
    return browserStorage()?.getItem(accessTokenKey) ?? null;
  },
  getRefreshToken() {
    return browserStorage()?.getItem(refreshTokenKey) ?? null;
  },
  setTokens(tokens: { access: string; refresh: string }) {
    const storage = browserStorage();
    storage?.setItem(accessTokenKey, tokens.access);
    storage?.setItem(refreshTokenKey, tokens.refresh);
  },
  clearTokens() {
    const storage = browserStorage();
    storage?.removeItem(accessTokenKey);
    storage?.removeItem(refreshTokenKey);
  },
};
