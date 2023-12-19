import { NextResponse } from "next/server";               // APIミドルウェアでレスポンスを操作するためのオブジェクト
import { PrismaClient } from "@prisma/client";            // データベース接続とクエリのためのメインオブジェクト
import getStaffUsers from "@/app/actions/getStaffUsers";  //教員のセッション情報認証ロジックをインポート


const prisma = new PrismaClient();                        // prisma clientのインスタンス生成


// DB接続関数の定義
export async function main() {
  try {
    await prisma.$connect();    // DBに接続
    console.log("DB接続");      // DB接続成功時のログ出力
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}


// 予約待ちリスト(WaitingList)を表示するAPI
// export const GETsWaitingLists = async (req: Request, res: NextResponse) => {
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET WaitingLists");
  try {
    await main();   // DB接続関数の呼び出し
    const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
    const studentEmail = "sample005@gmail.com"     // 変数emailにダミーのメールアドレスを格納する
    const waitingList = await prisma.waitingList.findMany({      // findManyメソッドを使用して、waitingListテーブルから複数のレコードを取得
      where: { studentEmail }   // whereメソッドを使用して、studentEmailが一致するレコードを取得
    });
    return NextResponse.json(
      // { message: "Success", GETsWaitingLists, studentEmail },
      {
        message: "Success",
        waitingList,
        // studentEmail,
        // staffEmail
      },
      { status: 200 }           // ステータスコード all OK
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error", err },
      { status: 500 });         // ステータスコード Internal Server Error
  } finally {
    await prisma.$disconnect(); // DBへの接続を解除
    console.log("DB切断");      // DB切断成功時のログ出力
  }
};


// 仮の予約待ちリスト(WaitingList)に予約を追加するAPI
export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST WaitingList");
  try {
    await main();   // DB接続関数の呼び出し
    // const email = await getUsermail()      // 変数emailにセッション情報から取得したemail情報を格納する
    // const email = "yama@master.mail.com"      // 変数emailにダミーのメールアドレスを格納する
    // const studentEmail = "yama@master.mail.com"     // 変数emailにダミーのメールアドレスを格納する
    // const studentEmail = email     // 変数emailにダミーのメールアドレスを格納する
    const { studentEmail, staffEmail, ymd, time, details } = await req.json();
    const waitingList = await prisma.waitingList.create({
      data: {
        studentEmail,
        staffEmail,
        ymd,
        time,
        details,
      },
    });
    return NextResponse.json(
      // { message: "Success", waitingList, studentEmail, staffEmail },
      { message: "Success", waitingList },
      { status: 200 }           // ステータスコード all OK
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error", err },
      { status: 500 });         // ステータスコード Internal Server Error
  } finally {
    await prisma.$disconnect(); // DBへの接続を解除
    console.log("DB切断");      // DB切断成功時のログ出力
  }
};


// 予約待ちリスト(WaitingList)から予約申請をキャンセルするAPI
// export const DELETE = async (req: Request, res: NextResponse) => {
//   console.log("DELETE WaitingList");
//   try{
//     await main();   // DB接続関数の呼び出し
//     const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
//     const studentEmail = "sample004@gmail.com"     // 変数emailにダミーのメールアドレスを格納する
//     const waitingList = await prisma.waitingList.update({
//       where: { studentEmail },
//       data: { status: "cancelled" },
//     });
//     } catch (err) {
//     return NextResponse.json(
//       { message: "Error", err },
//       { status: 500 });         // ステータスコード Internal Server Error
//   } finally {
//     await prisma.$disconnect(); // DBへの接続を解除
//     console.log("DB切断");      // DB切断成功時のログ出力
//   }
// };