import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";
import getUserId from "@/app/actions/getUserId";
import connectDb from "@/app/actions/connectDb";

// GET
// 職員ごとの確定した予定の取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    // 操作している職員のidを取得
    const userMail = await getUserMail();
    const staffId = await getUserId(userMail);
    await connectDb(); // dbに接続

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
