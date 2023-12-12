import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * ユーザー型の拡張
   */
  interface User {
    role?: string | null; // role プロパティを string | null 型として定義
  }

  /**
   * セッション型の拡張
   */
  interface Session {
    user: {
      role?: string | null; // こちらも string | null 型として定義
    } & DefaultSession["user"];
  }
}
