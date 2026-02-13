import Cookies from "js-cookie";

type CookieOptions = {
  expires?: number | Date;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  path?: string;
  domain?: string;
};

const defaultOptions: CookieOptions = {
  path: "/",
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
  // domain: "localhost",
  sameSite: "Lax",
  secure: true,
  expires: 7,
};

// ✅ Set cookie
export function setCookie(key: string, value: string, options?: CookieOptions) {
  Cookies.set(key, value, { ...defaultOptions, ...options });
}

// ✅ Get cookie
export function getCookie(key: string): string | undefined {
  return Cookies.get(key);
}

// ✅ Remove cookie
export function removeCookie(key: string) {
  Cookies.remove(key, {
    path: defaultOptions.path,
    domain: defaultOptions.domain,
  });
}

const defaultOption = {
  path: "/",
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
};

export function clearAllCookies() {
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach((key) => {
    Cookies.remove(key, defaultOption);
  });
}

export const formatNumber = (value) =>
  isNaN(Number(value)) ? value : Number(value).toLocaleString();
