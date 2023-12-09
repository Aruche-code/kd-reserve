import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      // "/staff" へのアクセスは role が "staff" の場合のみ許可
      if (req.nextUrl.pathname.startsWith("/staff")) {
        return token?.role === "staff";
      }
      // "/student" へのアクセスは role が "student" の場合のみ許可
      else if (req.nextUrl.pathname.startsWith("/student")) {
        return token?.role === "student";
      }
      // "/users" へのアクセスは認証されたユーザーのみ許可
      else if (req.nextUrl.pathname.startsWith("/users")) {
        return Boolean(token);
      }
      // 上記以外のパスへのアクセスは全て拒否
      return false;
    },
  },
});

export const config = {
  matcher: ["/users/:path*", "/student/:path*", "/staff/:path*"],
};
