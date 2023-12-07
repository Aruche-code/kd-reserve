"use client";

import { SessionProvider } from "next-auth/react"; // 'next-auth/react'からSessionProviderをインポート

// AuthContextPropsインターフェースを定義します。これは子コンポーネントを受け取るためのものです。
export interface AuthContextProps {
  children: React.ReactNode; // children: このコンテキストプロバイダ内に表示されるReactノード
}

// AuthContext関数コンポーネントを定義します。
export default function AuthContext({ children }: AuthContextProps) {
  return (
    // SessionProviderコンポーネントでchildrenをラップします。
    // これにより、アプリケーションのどこからでも認証セッションにアクセスできるようになります。
    <SessionProvider>{children}</SessionProvider>
  );
}
