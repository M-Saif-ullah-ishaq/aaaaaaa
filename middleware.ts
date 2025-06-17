import { authMiddleware } from "@clerk/nextjs/server";

// Temporarily allow all requests for testing
export default function middleware() {
    return;
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};