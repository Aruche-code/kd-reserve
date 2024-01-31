import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";
import { pusherServer } from "@/app/libs/pusher";

// 画面を操作している職員が指定されているWaitingListを表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    // 操作している職員のidを取得
    const userMail = await getUserMail();
    const staff: any = await prisma.user.findUnique({
      where: { email: userMail },
      select: {
        id: true, // 学生のid
      },
    });

    // 操作している職員が指定されている承認待ちリストの取得
    const waitingList = await prisma.waitingList.findMany({
      where: { staffUserId: staff.id },
      select: {
        id: true,
        studentName: true,
        studentUserId: true,
        details: true,
        firstYmd: true,
        firstStartTime: true,
        firstEndTime: true,
        secondYmd: true,
        secondStartTime: true,
        secondEndTime: true,
        thirdYmd: true,
        thirdStartTime: true,
        thirdEndTime: true,
      },
    });

    // 職員が特に指定されていない承認待ちリストの取得
    const noNominationList = await prisma.waitingList.findMany({
      where: { staffUserId: null },
      select: {
        id: true,
        studentName: true,
        studentUserId: true,
        details: true,
        firstYmd: true,
        firstStartTime: true,
        firstEndTime: true,
        secondYmd: true,
        secondStartTime: true,
        secondEndTime: true,
        thirdYmd: true,
        thirdStartTime: true,
        thirdEndTime: true,
      },
    });

    // これまでに取得して情報をひとまとめにしてレスポンスデータを作成
    const wait = {
      waitingList: waitingList,
      noNominationList: noNominationList,
    };

    return NextResponse.json({ message: "Success", wait }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// Bookingコレクションに情報を登録するAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { id, studentUserId, ymd, time, details } = await req.json();

    // 職員のユーザーIDを取得する
    const userMail = await getUserMail();
    const staffData: any = await prisma.user.findUnique({
      where: { email: userMail },
      select: {
        id: true,
        name: true,
      },
    });

    const staffUserId: any = staffData.id;
    const staffName: any = staffData.name;

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
      const email = await getUserMail();

      // 予約情報に保存するための生徒の名前を取得する
      const studentData: any = await prisma.user.findUnique({
        where: { id: studentUserId },
        select: {
          name: true, // 生徒の名前
        },
      });

      const studentName: any = studentData.name;

      // Bookingコレクションにデータを保存
      await prisma.booking.create({
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

      await prisma.record.create({
        data: {
          content: details,
          ymd: ymd,
          // 既存のUserとrecordの関連付け
          user: { connect: { id: studentUserId } },
        },
      });

      // bookingに予定を追加したとき、waitingListの予定を削除
      await prisma.waitingList.delete({
        where: { id: id },
      });

      //生徒側のホームルートのリアルタイム更新で使用
      await pusherServer.trigger("booking-channel", "booking-event", {
        message: "New booking created",
      });

      return NextResponse.json({ message: "Success" }, { status: 201 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// 拒否されたWaitingListを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const { id }: { id: string } = await req.json();

    await prisma.waitingList.delete({
      where: { id: id },
    });

    //生徒側のホームルート更新
    await pusherServer.trigger(
      "booking-cancel-channel",
      "booking-cancel-event",
      {
        message: "New booking cancel",
      }
    );
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
