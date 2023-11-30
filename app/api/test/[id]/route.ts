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

// postコレクションから_idオブジェクト指定しドキュメントを取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET");

  try {
    const id = req.url.split("/test/")[1]; //http://localhost:3000/api/test/65687f2641b2be27d7265817
    await main();
    const post = await prisma.post.findMany({
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// postコレクションから_idオブジェクト指定しドキュメントを編集するAPI
export const PUT = async (req: Request, res: NextResponse) => {
  console.log("PUT");

  try {
    const id = req.url.split("/test/")[1]; //http://localhost:3000/api/test/65687f2641b2be27d7265817
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.update({
      where: { id },
      data: { title, description },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
