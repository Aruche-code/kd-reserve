import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";
import getUserId from "@/app/actions/getUserId";
import connectDb from "@/app/actions/connectDb";

// GET
// 職員ごとの確定した予定の取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    // 操作している学生のidを取得
    const usermail = await getUserMail();
    const studentId = await getUserId(usermail);
    await connectDb;

    const getBookingList = await prisma.booking.findMany({
      where: { studentUserId: studentId },
      select: {
        id: true,
        staffName: true,
        ymd: true,
        time: true,
        details: true,
      },
    });

    const getWaitingList = await prisma.waitingList.findMany({
      where: { studentUserId: studentId },
      select: {
        id: true,
        staffName: true,
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

    return NextResponse.json(
      { message: "Success", getBookingList, getWaitingList },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // DBへの接続を閉じる
  }
};
