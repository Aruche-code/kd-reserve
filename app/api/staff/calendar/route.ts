import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";

// NG日程の作成
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail(); // 変数emailにセッション情報から取得したemail情報を格納する

    const { ymd, time } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    await prisma.staffNg.create({
      // emailと一致するuserにstaffNgを作成
      data: {
        ymd,
        time,
        user: {
          connect: { id: user?.id },
        },
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// NG日程と予約確定日時の表示
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();
    // 職員のidを取得
    const staff: any = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
      },
    });
    const staffUserId: any = staff.id;

    const getstaffng = await prisma.user.findUnique({
      where: { email },
      select: {
        staffng: {
          select: {
            ymd: true,
            time: true,
          },
        },
      },
    });

    const getbooking = await prisma.booking.findMany({
      where: { staffUserId: staffUserId },
      select: {
        studentName: true,
        ymd: true,
        time: true,
        details: true,
      },
    });

    const responseData = {
      staffng: getstaffng?.staffng,
      booking: getbooking,
    };

    return NextResponse.json(
      { message: "Success", responseData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// 指定したidのNG日程を編集
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail(); // 変数emailに操作している職員のメールアドレスを挿入
    const staffNgId: any = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
      },
    }); // staffNgIdに職員のオブジェクトidを格納する

    const { ymd, time } = await req.json();

    await prisma.staffNg.update({
      // staffNgIdと一致するstaffNgテーブルを編集
      where: { id: staffNgId },
      data: {
        ymd,
        time,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// 指定したidのNG日程を削除
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    // 操作している職員のidを取得
    const userMail = await getUserMail();
    const staffNg: any = await prisma.user.findUnique({
      where: { email: userMail },
      select: {
        id: true, // 学生のid
      },
    });
    const staffNgId: any = staffNg.id;

    await prisma.staffNg.delete({
      // staffNgIdと一致するstaffNgテーブルを削除
      where: {
        id: staffNgId,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
