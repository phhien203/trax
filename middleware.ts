import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/", "/playlist", "/library"];

export default function (req: NextRequest) {
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("TRAX_ACCESS_TOKEN");

    if (!token) {
      return NextResponse.rewrite(new URL("/signin", req.url));
    }
  }
}
