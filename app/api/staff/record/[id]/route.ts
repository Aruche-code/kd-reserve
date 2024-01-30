import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

//未完成です

// このエンドポイントは、生徒ごとの履歴を取得するAPIです。
// APIで仕様する検索用キーに生徒のユーザーモデルのオブジェクトIDが必要

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // URLの動的な部分からstudentUserIdを抽出
    const studentUserId = req.nextUrl.pathname.split("/").pop();

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Server Error", err }, { status: 500 });
  }
};
