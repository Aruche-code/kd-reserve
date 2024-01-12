import { NextResponse } from "next/server";               // APIミドルウェアでレスポンスを操作するためのオブジェクト
import { PrismaClient } from "@prisma/client";            // データベース接続とクエリのためのメインオブジェクト
import getStaffUsers from "@/app/actions/getStaffUsers";  //教員のセッション情報認証ロジックをインポート
import getUserMail from "@/app/actions/getUserMail";      //ユーザーのセッション情報認証ロジックをインポート

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


// 確定済み予約リスト(Booking)を表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET Booking");
  try {
    await main();   // DB接続関数の呼び出し
    // const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
    // const email = await getUserMail();              // 変数emailにセッション情報から取得したemail情報を格納する
    const email = "sample4@gmail.com"     // 変数emailにダミーのメールアドレスを格納する
    const user = await prisma.user.findMany({         // findManyメソッドを使用して、waitingListテーブルから複数のレコードを取得
      where: { email }, // whereメソッドを使用して、studentEmailが一致するレコードを取得
      select: {         // selectメソッドを使用して、取得するカラムを指定
        name: true,
        booking: true,
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


// 仮の確定済み予約リスト(Booking)に予約を追加するAPI
export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST Booking");
  try {
    await main();   // DB接続関数の呼び出し
    // const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
    // const email = await getUserMail();              // 変数emailにセッション情報から取得したemail情報を格納する
    const email = "sample4@gmail.com"     // 変数emailにダミーのメールアドレスを格納する
    const {
      staffUserId,
      ymd,
      time,
      details,
    } = await req.json();
    const booking = await prisma.booking.create({
      data: {
        staffUserId,
        ymd,
        time,
        details,
        User: { connect: { email } },   // 既存のUserとStudentProfileの関連付け
    },
    include: {
        User: true,             // userテーブルも含めて取得
    },
    });
    return NextResponse.json(
      { message: "Success", booking },
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


// 確定済み予約リスト(Booking)から予約申請をキャンセルするAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  console.log("DELETE Booking");
  try{
    await main();   // DB接続関数の呼び出し
    // const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
    // const email = await getUserMail();              // 変数emailにセッション情報から取得したemail情報を格納する
    const email = "sample4@gmail.com"     // 変数emailにダミーのメールアドレスを格納する
    // Userを検索
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
          booking: true,
      },
  });
  if (user) {
      // 取得したemailにBookingが存在する場合、削除
      await prisma.booking.deleteMany({
          where: {
              userId: user.id,
          },
      });
    }
    return NextResponse.json(
      { message: "Success", user },
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