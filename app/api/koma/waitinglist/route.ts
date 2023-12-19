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
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET WaitingLists");
  try {
    await main();   // DB接続関数の呼び出し
    // const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
    const email = "yama@master.mail.com"     // 変数emailにダミーのメールアドレスを格納する
    const user = await prisma.user.findMany({      // findManyメソッドを使用して、waitingListテーブルから複数のレコードを取得
      where: { email }, // whereメソッドを使用して、studentEmailが一致するレコードを取得
            include: {
                waitinglist: true, // waitingListテーブルも含めて取得
            },
    });
    return NextResponse.json(
      { message: "Success", user,},
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
    const email = "yama@master.mail.com"     // 変数emailにダミーのメールアドレスを格納する
    const {
      staffEmail,
      details,
      firstYmd,
      firstStartTime,
      firstEndTime,
      secondYmd,
      secondStartTime,
      secondEndTime,
      thirdYmd,
      thirdStartTime,
      thirdEndTime,
    } = await req.json();
    const waitingList = await prisma.waitingList.create({
      data: {
        staffEmail,
        details,
        firstYmd,
        firstStartTime,
        firstEndTime,
        secondYmd,
        secondStartTime,
        secondEndTime,
        thirdYmd,
        thirdStartTime,
        thirdEndTime,
        user: { connect: { email } },        // 既存のUserとStudentProfileの関連付け
    },
    include: {
        user: true,             // userテーブルも含めて取得
    },
    });
    return NextResponse.json(
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
export const DELETE = async (req: Request, res: NextResponse) => {
  console.log("DELETE WaitingList");
  try{
    await main();   // DB接続関数の呼び出し
    // const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
    // const email = await getUsermail();     // 変数emailにセッション情報から取得したemail情報を格納する
    const email = "yama@master.mail.com"     // 変数emailにダミーのメールアドレスを格納する
    const waitingList = await prisma.waitingList.delete({
      where: { id: "658002ebcc815bb9666acd60" },    // whereメソッドを使用して、idが一致するレコードを取得(idはDBからコピペ)
    });
    return NextResponse.json(
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