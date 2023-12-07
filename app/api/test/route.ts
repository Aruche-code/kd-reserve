import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// test_dbからpostコレクション内の全ドキュメントを取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GETS");
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// postコレクションに新たなドキュメントを追加
export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST");

  try {
    const { title } = await req.json();
    await main();
    const post = await prisma.post.create({ data: { title } });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
