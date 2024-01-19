import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// DELETE
// 指定された予定を削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const { scheduleId } = await req.json();

    await main();
    const user = await prisma.booking.delete({
      where: { id: scheduleId },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
