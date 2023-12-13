import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getUsermail from "@/app/actions/getUsermail";

const prisma = new PrismaClient();

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// ユーザーのemailを表示させるAPI テスト用
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GETS");
  try {
    const useremail = await getUsermail();
    return NextResponse.json(
      { message: "Success", useremail },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// ユーザーを特定し名前を編集可能にするAPI テスト用
export const PUT = async (req: Request, res: NextResponse) => {
  console.log("PUT");
  try {
    const useremail = await getUsermail();
    const username = await req.json();
    await main();
    const name = await prisma.user.update({
      where: {
        email: useremail,
      },
      data: {
        name: username,
      },
    });
    return NextResponse.json({ message: "Success", name }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
