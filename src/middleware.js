import { NextResponse } from "next/server";
import { verifyJWT } from "/utils/helpers/authHelpers.js";

const unsafeMethods = ["POST", "PUT", "DELETE"];

export async function middleware(req) {
    console.log("Middleware is running", req.nextUrl.pathname);

    if (unsafeMethods.includes(req.method) && ![
        "/api/auth/register",
        "/api/auth/login"

    ].includes(req.nextUrl.pathname)) {
        console.log("VERIFY");
        let jwtPayload;
        try {
            const bearer = req.headers.get("Authorization") || "";
            console.log("bearer", bearer)
            const token = bearer.split(" ")?.[1];
            if (!token) {
                throw new Error("No token submitted");
            }

            jwtPayload = await verifyJWT(token);
            const headers = new Headers(req.headers);
            headers.set("userId", JSON.stringify(jwtPayload.userId));
            return NextResponse.next({ headers: headers });
        } catch (error) {
            console.error("Error in middleware:", error.message);
            return NextResponse.json({
                error: "Unauthorized request",
            }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/items/:path*",
        "/api/auth/register",
        "/api/auth/login"
    ],
};
