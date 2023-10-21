import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = [
  // "/sign-in",
  // "/sign-up",
  // "/change-password",
  // "/change-password-request",
  "/dashboard",
];
function getIsProtectedPage(pathname: string) {
  return PROTECTED_PATHS.includes(pathname);
}

export default function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  // TODO: check with backend if JWT is valid
  const isSignedIn = !!req.cookies.has("next-auth.session-token");
  const isProtectedPage = getIsProtectedPage(pathName);

  if (isProtectedPage && !isSignedIn) {
    return NextResponse.redirect(new URL("/product", req.url));
  }

  if (["/", "/home"].includes(pathName)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}
