// Prisma, NextAuth, そして各種認証プロバイダとbcryptをインポート
// AuthOptionsでPrismaAdapterを使う設定になっているので、プロバイダーごとに返したユーザーオブジェクトが、
// usersテーブルに保存されます。

import bcrypt from "bcrypt"; // bcryptライブラリのインポート
import NextAuth, { AuthOptions } from "next-auth"; // NextAuthとその型定義のインポート
import CredentialsProvider from "next-auth/providers/credentials"; // 資格情報に基づく認証プロバイダ
import GithubProvider from "next-auth/providers/github"; // GitHub認証プロバイダ
import GoogleProvider from "next-auth/providers/google"; // Google認証プロバイダ
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // PrismaAdapterのインポート

// Prismaのクライアントインスタンスをインポート
import prisma from "@/app/libs/prismadb";

// NextAuthの設定オプション
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Prismaアダプタを使ってデータベースとの連携を設定

  // 認証プロバイダの設定
  providers: [
    // GitHub OAuthプロバイダの設定
    GithubProvider({
      clientId: process.env.GITHUB_ID as string, // 環境変数からGitHubのクライアントIDを取得
      clientSecret: process.env.GITHUB_SECRET as string, // 環境変数からGitHubのクライアントシークレットを取得
    }),
    // Google OAuthプロバイダの設定
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, // 環境変数からGoogleのクライアントIDを取得
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // 環境変数からGoogleのクライアントシークレットを取得
      profile(profile) {
        // メールアドレスが指定されたドメイン以外であるかチェック
        if (!profile.email.endsWith("@st.kobedenshi.ac.jp")) {
          throw new Error("Unauthorized email domain");
        }
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    // カスタム資格情報プロバイダの設定
    CredentialsProvider({
      name: "credentials", // プロバイダの名前
      credentials: {
        email: { label: "email", type: "text" }, // ユーザー名としてのメールアドレス
        password: { label: "password", type: "password" }, // パスワード
      },
      // 資格情報に基づく認証処理
      async authorize(credentials) {
        // メールアドレスとパスワードが提供されているか確認
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // データベースからユーザー情報を検索
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // ユーザーが存在しない、またはパスワードが設定されていない場合エラー
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // 提供されたパスワードがデータベースに保存されたハッシュと一致するか確認
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // パスワードが一致しなければエラー
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // 認証成功時、ユーザー情報を返す
        return user;
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development", // 開発環境の場合、デバッグ情報を有効にする

  session: {
    strategy: "jwt", // セッション管理にJWT（JSON Web Token）を使用
  },

  secret: process.env.NEXTAUTH_SECRET, // NextAuthのシークレットキー
};

// NextAuthハンドラを作成し、GETおよびPOSTリクエスト用にエクスポート
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
