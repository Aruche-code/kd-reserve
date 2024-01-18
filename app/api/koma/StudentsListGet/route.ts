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

// 学生一覧を取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET All Students");
  try{
    await main(); // DB接続関数の呼び出し
    const user = await prisma.user.findMany({
      where: { role: "student" },  // 学生のみを検索対象とする
      select: {
        name: true,
        email: true,
      },
    })

    // emailから数値の部分(学籍番号)のみを取り出す部品
    const transformedUsers = user.map(user => ({
      studentIdNumber:
        user.email ?                          // nullチェックを行い、以下のreplaceメソッドを安全に呼び出す
        user.email.replace(/\D/g, '') : "",   // \D: 数字以外を表す正規表現
      name: user.name,
      // email: user.email,
    }));

    // 成功時のレスポンス
    return NextResponse.json(
      { message: "Success", users: transformedUsers, },
      { status: 200 }           // ステータスコード all OK
    );
  } catch (err) {
    console.error("Error:", err);   // エラー時の確認用ログ出力
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // DBへの接続を解除
  }
};