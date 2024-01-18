import { NextApiRequest, NextApiResponse } from "next";   // APIルートのリクエストとレスポンスの型定義

import { NextResponse } from "next/server";               // APIミドルウェアでレスポンスを操作するためのオブジェクト
import { PrismaClient } from "@prisma/client";            // データベース接続とクエリのためのメインオブジェクト
// import getStaffUsers from "@/app/actions/getStaffUsers";  //教員のセッション情報認証ロジックをインポート
// import getUserMail from "@/app/actions/getUserMail";      //ユーザーのセッション情報認証ロジックをインポート

const prisma = new PrismaClient();                        // prisma clientのインスタンス生成


// DB接続関数の定義
export async function main() {
  try {
    await prisma.$connect();    // DBに接続
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}


// 学生を学籍番号で検索し取得するAPI
// export const GET = async (req: Request, res: NextResponse) => {
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("GET Searched Students");
  try {
    await main(); // DB接続関数の呼び出し
    // const { searchValue } = req.query;  // 検索値をリクエストから取得
    const searchValue = "1333";      // 仮の検索値入力

    if (searchValue) {
      // const user: any = await prisma.user.findMany({
      const user = await prisma.user.findMany({

        where: {
          role: "student",  // 学生のみを検索対象とする
          email: {          // 学籍番号が紐づけられたmailAddressを取得
            endsWith: `@st.kobedenshi.ac.jp`,
            contains: `kd${searchValue}`,
          },
        },
        select: {           // 表示するフィールドを指定する
          name: true,
          email: true,
          // studentProfile: true, // プロフィール
          // record: true,         // カルテ情報
          // booking: true,        // 面談予約情報
        },
      });

      // emailから数値の部分(学籍番号)のみを取り出す
      const transformedUsers = user.map(user => ({
        numericPartOfEmail:
          user.email ?                          // nullチェックを行い、以下のreplaceメソッドを安全に呼び出す
          user.email.replace(/\D/g, '') : "",   // \D: 数字以外を表す正規表現
        name: user.name,
        // email: user.email,
      }));

      if (transformedUsers.length > 0) {
        return NextResponse.json(
          { message: "Success",
            searchValue,              // 検索値を返却
            users: transformedUsers,  // 学生情報(name, 学籍番号)
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "User Not Found",
            searchValue,              // 検索値(学籍番号)を返却
          },
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