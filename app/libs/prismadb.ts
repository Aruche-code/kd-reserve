//このコードの主な目的は、データベースへの接続を効率的に管理し、
//特に開発環境でのリソースの無駄を防ぐためです。

import { PrismaClient } from "@prisma/client"; // PrismaClientをインポート

declare global {
  var prisma: PrismaClient | undefined; // グローバル変数`prisma`の宣言
}

const client = globalThis.prisma || new PrismaClient(); // `prisma`が存在すれば使用し、なければ新しいインスタンスを生成
if (process.env.NODE_ENV !== "production") globalThis.prisma = client; // 非本番環境でのみグローバル変数にインスタンスを割り当て

export default client; // PrismaClientインスタンスをエクスポート
