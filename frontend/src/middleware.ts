import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Tokens } from "./types/enums";

export function middleware(request: NextRequest) {
    const { url, cookies } = request;

    /* if (url === "http://localhost:3000/") {
        return NextResponse.redirect(new URL("/auth/login", url));
    }*/

    const accessToken = cookies.get(Tokens.ACCESS_TOKEN)?.value;

    const isAuthPage = url.includes("/auth");

    const isMainPage = url.includes("/dashboard");

    if (isAuthPage && accessToken) {
        return NextResponse.rewrite(new URL("/dashboard", url));
    }

    if (isMainPage && !accessToken) {
        return NextResponse.rewrite(new URL("/auth/login", url));
    }

    return NextResponse.next();
}
