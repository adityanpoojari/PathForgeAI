import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Enforce security headers dynamically
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  // Cross-Origin Resource Sharing (CORS) check: only allow same-origin for state-changing operations
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host && ["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        // Disallow cross-origin POST requests to internal APIs
        if (request.nextUrl.pathname.startsWith("/api/")) {
          return new NextResponse(
            JSON.stringify({ error: "Cross-origin request blocked" }),
            { status: 403, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    } catch {
      // Invalid URL in origin header
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
