// サーバーサイドでユーザーセッションを取得するための関数です。各部分の説明は以下の通りです：

// getServerSession：next-authライブラリから提供される関数で、
// サーバーサイドで現在のユーザーセッションを取得するために使用されます。
// authOptions：next-authの設定オプションを含んでいるオブジェクトです。
// このオプションは、認証プロバイダ、セッション管理、コールバックなどのnext-authの設定に関連しています。

import { getServerSession } from "next-auth";

import { authOptions } from "../libs/auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
