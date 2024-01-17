import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getUserMail from "@/app/actions/getUserMail";

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// Bookingコレクションに情報を登録するAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { studentUserId, ymd, time, details } = await req.json();
    await main();

    // 職員のユーザーIDを取得する
    // 本番用
    const userMail = await getUserMail();
    const staffData: any = await prisma.user.findUnique({
      where: { email: userMail },
      select: {
        id: true, // 職員のIDを取得
        name: true, // 職員の名前を取得
      },
    });

    const staffUserId: any = staffData.id;
    const staffName: any = staffData.name;

    // テスト用
    // const staffUserId = "657a50663dbe46e6c28b95ca"
    // const staffData: any = await prisma.user.findUnique({
    //     where: { id: staffUserId },
    //     select: {
    //         name: true,                   // 職員の名前
    //     },
    // });

    // const staffName: any = staffData.name

    // すでに同じ時間帯に予定が存在しているかの判定
    const BookingData = await prisma.booking.findMany({
      where: {
        staffUserId: staffUserId,
        ymd: ymd,
        time: {
          hasEvery: time,
        },
      },
    });

    if (BookingData.length > 0) {
      // データが存在する場合の処理
      return NextResponse.json(
        { message: "すでに予定が存在しています" },
        { status: 409 }
      );
    } else {
      // データが存在しない場合の処理
      // Userコレクションに紐づけるために、予約確定画面を操作している職員のメールアドレスを取得
      // 本番用
      // const email = getUserMail()

      // テスト用 予約確定画面を操作している職員のメールアドレスを取得
      const email = "yama@master.mail.com";

      // 予約情報に保存するための生徒の名前を取得する
      const studentData: any = await prisma.user.findUnique({
        where: { id: studentUserId },
        select: {
          name: true, // 生徒の名前
        },
      });

      const studentName: any = studentData.name;

      // Bookingコレクションにデータを保存
      const BookingCreate = await prisma.booking.create({
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

      const record = await prisma.record.create({
        data: {
          content: details,
          ymd: ymd,
          // 既存のUserとrecordの関連付け
          user: { connect: { id: studentUserId } },
        },
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailをもつUserのWaitinglistを表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET");

  try {
    const email = await getUsermail() 本番
    //const email = "sample3@gmail.com"; //テスト
    await main();
    const wait = await prisma.user.findMany({
      where: { email },
      include: {
        waitinglist: true,
      },
    });

    return NextResponse.json({ message: "Success", wait }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailのWatinglistを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  console.log("DELETE");

  try {
    // const email = await getUsermail() 本番
    const email = "sample3@gmail.com"; //テスト
    await main();

    // Userを検索
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        waitinglist: true,
      },
    });

    if (user) {
      // Waitinglistが存在する場合、削除
      await prisma.waitingList.deleteMany({
        where: {
          userId: user.id,
        },
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
