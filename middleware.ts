import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // Matches the pages config in `[...nextauth]`
  function middleware() {
    return NextResponse.next()
  },
{
     callbacks: {
   authorized({ req , token }) {
     const {pathname} = req.nextUrl
     if (pathname.startsWith("/api/auth") || pathname==="/login" || pathname==="/register") 
         return true

    if (pathname.startsWith("/")||pathname.startsWith("api/video"))
        return true
    return !!token
 }
}
})


export const config = {
    matcher: [
        // Match all paths except for the ones starting with /api/auth
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
}