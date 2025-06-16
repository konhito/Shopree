import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/pricing",
  "/services",
  "/login",
  "/signup",
  "/dashboard",
];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x.replace("*", ".*")}$`))
  );
};

export default authMiddleware({
  publicRoutes: publicPaths,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
