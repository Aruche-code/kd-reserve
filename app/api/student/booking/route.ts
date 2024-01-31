import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";
import { pusherServer } from "@/app/libs/pusher";

// 先生のプロフィール等の表示   ＊2023-12-19 最終編集 後々職員プロフィール情報がレスポンスに追加される可能性あり
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const staffUsers = await prisma.user.findMany({
      where: { role: "staff" },
      select: {
        id: true, // スタッフのid
        name: true, // スタッフの名前
        staffProfile: {
          // 職員のプロフィール情報
          select: {
            gender: true, // 性別
            Strengths: true, // 得意なこと
            tastes: true, // 趣味
            workhistory: true, // 勤務歴
          },
        },
      },
    });
    return NextResponse.json(
      { message: "Success", staffUsers },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// 指定したemailのUserにWaitingListを追加するAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();

    // 予約情報に保存するための学生の名前とIDを取得する
    const studentData: any = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true, // 学生のID
        name: true, // 学生の名前
      },
    });
    const studentUserId: string = studentData.id;
    const studentName: string = studentData.name;

    const {
      staffUserId,
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

    if (staffUserId != null) {
      // 予約情報に保存するための職員の名前を取得する
      const staffData: any = await prisma.user.findUnique({
        where: { id: staffUserId },
        select: {
          name: true, // 職員の名前
        },
      });

      // 職員が指名されている場合
      const staffName: any = staffData.name;

      // 予約情報をUserモデルの中の操作している学生のWaitingListに保存する
      await prisma.waitingList.create({
        data: {
          studentUserId,
          studentName,
          staffUserId,
          staffName,
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
          // 既存のUserとWaitingListとの関連付け
          user: { connect: { email } },
        },
        include: {
          user: true, // userテーブルも含めて取得
        },
      });

      await pusherServer.trigger("waiting-add-channel", "waiting-add-event", {
        message: "New waiting add",
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      // 職員が指名されていない場合
      const staffName: any = "指名なし";

      // 予約情報をUserモデルの中の操作している学生のWaitingListに保存する
      await prisma.waitingList.create({
        data: {
          studentUserId,
          studentName,
          staffUserId,
          staffName,
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
          // 既存のUserとWaitingListとの関連付け
          user: { connect: { email } },
        },
        include: {
          user: true, // userテーブルも含めて取得
        },
      });

      await pusherServer.trigger("waiting-add-channel", "waiting-add-event", {
        message: "New waiting add",
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
