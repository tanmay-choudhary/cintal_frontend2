// middleware.js
import { NextResponse } from "next/server";
import { isLoggedIn } from "./middlewares/auth";
//import { handleLoginWithGoogle } from "./middlewares/loginWithGoogle";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  let refreshToken = req.cookies.get("refresh_token");

  // Access only when logged in
  //console.log(pathname, "pathname1", refreshToken, "refreshToken");
  if (pathname === "/") {
    const checkLogin = await isLoggedIn(refreshToken?.value);
    console.log(checkLogin);
    if (false === checkLogin) {
      const absoluteURL = `http://localhost:3000/login`;
      return NextResponse.redirect(absoluteURL);
    } else {
      const absoluteURL = `http://localhost:3000/profile`;
      return NextResponse.redirect(absoluteURL);
    }
  }

  if (
    pathname === "/patient" ||
    pathname === "/doctor" ||
    pathname === "/appointment" ||
    pathname === "/profile"
  ) {
    const checkLogin = await isLoggedIn(refreshToken?.value);
    console.log(checkLogin);
    if (false === checkLogin) {
      const absoluteURL = `http://localhost:3000/login`;
      return NextResponse.redirect(absoluteURL);
    }
  }

  // If logged in, redirect to jobs page,login with google
  if (pathname === "/login" || pathname === "/sign-up") {
    const checkLogin = await isLoggedIn(refreshToken?.value);
    if (true === checkLogin) {
      const absoluteURL = `${req.nextUrl.protocol}//${req.nextUrl.host}/profile`;
      return NextResponse.redirect(absoluteURL);
    }
  }

  return NextResponse.next();
}

// Export the matcher if needed
export const config = {
  matcher: "/:path*",
};
