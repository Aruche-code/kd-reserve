import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";
import { time } from "console";

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// GET
// 職員ごとの確定した予定の取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main(); // dbに接続

    // 操作している職員のidを取得
    // 本番用
    const userMail = await getUserMail();
    const staff : any = await prisma.user.findUnique({
      where: { email: userMail },
      select: {
          id: true,                   // 職員のid
      },
    });

    const staffId: any = staff.id

    // テスト用
    // const staffId = "657a50663dbe46e6c28b95ca";

    const getBookingList = await prisma.booking.findMany({
      where: { staffUserId: staffId },
      select: {
        studentName: true,
        ymd: true,
        time: true,
        details: true,
      },
    });
    return NextResponse.json(
      { message: "Success", getBookingList },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // DBへの接続を閉じる
  }
};

/*
// テスト用 同じ職員が同じ日の同じ時間帯にすでに予定が存在しているかの確認用
// GET
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();                                       // dbに接続

        // 操作している職員のidを取得
        /*  本番用
        const usermail = await getUserMail();
        const staff : any = await prisma.user.findUnique({
            where: { email: usermail },
            select: {
                id: true,                   // 学生のid
            },
        });

        const staffId: any = staff.id
        */

/*
        // テスト用
        const staffId = "657a50663dbe46e6c28b95ca"

        const getBookingList = await prisma.booking.findMany({
            where: {
                staffUserId: staffId,
                ymd: "2024-2-16",
                time: {
                    hasEvery: ["13:00", "14:00"]
                },
            },
        });
        return NextResponse.json({ message: "Success", getBookingList }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};
*/

// テスト用関数
// Bookingコレクションに情報を登録するAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    // Userコレクションに紐づけるために、予約確定画面を操作している職員のメールアドレスを取得
    // const email = getUserMail() // 本番用
    const email = "yama@master.mail.com"; // テスト用 予約確定画面を操作している職員のメールアドレスを取得

    const { studentUserId, staffUserId, ymd, time, details } = await req.json();
    await main();

    // 予約情報に保存するための職員の名前を取得する
    const staffData: any = await prisma.user.findUnique({
      where: { id: staffUserId },
      select: {
        name: true, // 職員の名前
      },
    });

    const staffName: any = staffData.name;

    // 予約情報に保存するための生徒の名前を取得する
    const studentData: any = await prisma.user.findUnique({
      where: { id: studentUserId },
      select: {
        name: true, // 生徒の名前
      },
    });

    const studentName: any = studentData.name;

    // Bookingコレクション
    const WaitingListCreate = await prisma.booking.create({
      data: {
        studentUserId,
        studentName,
        staffUserId,
        staffName,
        ymd,
        time,
        details,
        User: { connect: { email } },
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
