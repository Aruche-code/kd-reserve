import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getStaffUsers from "@/app/actions/getStaffUsers";

const prisma = new PrismaClient();

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}
// 職員を取得するAPI

export const GET = async (req: Request, res: NextResponse) => {
  console.log("GETS");
  try {
    await main();
    const staffusers = await getStaffUsers();
    return NextResponse.json(
      { message: "Success", staffusers },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
