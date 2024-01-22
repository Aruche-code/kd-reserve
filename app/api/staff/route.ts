import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";
import getUserId from "@/app/actions/getUserId";

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
    const userMail = await getUserMail();
    const staffId = await getUserId(userMail);

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
