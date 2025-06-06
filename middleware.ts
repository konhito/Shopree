import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/pricing",
  "/services",
  "/login",
  "/signup",
];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x.replace("*", ".*")}$`))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts
    const signInUrl = new URL("/login", request.url);
    // Only add redirect_url if we're not already on the login page
    if (!request.nextUrl.pathname.startsWith("/login")) {
      signInUrl.searchParams.set("redirect_url", request.url);
    }
    return NextResponse.redirect(signInUrl);
  }

  // If user is on login/signup page and is authenticated, redirect to dashboard
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
