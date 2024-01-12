import { NextApiRequest, NextApiResponse } from "next";   // APIルートのリクエストとレスポンスの型定義

import { NextResponse } from "next/server";               // APIミドルウェアでレスポンスを操作するためのオブジェクト
import { PrismaClient } from "@prisma/client";            // データベース接続とクエリのためのメインオブジェクト
import getStaffUsers from "@/app/actions/getStaffUsers";  //教員のセッション情報認証ロジックをインポート
import getUserMail from "@/app/actions/getUserMail";      //ユーザーのセッション情報認証ロジックをインポート

const prisma = new PrismaClient();                        // prisma clientのインスタンス生成


// DB接続関数の定義
export async function main() {
  try {
    await prisma.$connect();    // DBに接続
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}


// 学生一覧を取得するAPI
// export const GET = async (req: Request, res: NextResponse) => {
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("GET Students");
  try {
    await main(); // DB接続関数の呼び出し
    // const { searchValue } = req.query;  // 検索値をリクエストから取得
    const searchValue = "1333";      // 仮の検索値入力
    // // const searchValue = req.query?.searchValue;

    if (searchValue) {
      const user = await prisma.user.findMany({
        where: {
          role: "student",
          email: {
            endsWith: `@st.kobedenshi.ac.jp`,
            contains: `kd${searchValue}`,
          },
        },
        select: {
          name: true,
          email: true,
        },
      });

      if (user.length > 0) {
        return NextResponse.json(
          { message: "Success", user },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "一致する学生は見つかりませんでした" },
          { status: 404 }
        );
      }
    }
  } catch (err) {
    console.error("Error:", err);   // エラー時の確認用ログ出力
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // DBへの接続を解除
  }
};