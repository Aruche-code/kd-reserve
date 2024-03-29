import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// このエンドポイントは、生徒側予約画面で職員ごとのNG日程を取得するAPIです。
// APIで仕様する検索用キーに職員のユーザーモデルのオブジェクトIDが必要フロント側からクエリパラメータとしてIDを受け取る

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // URLの動的な部分からstaffUserIdを抽出
    const staffUserId = req.nextUrl.pathname.split("/").pop();

    // staffUserIdが一致するレコードを取得
    const staffNgData = await prisma.user.findMany({
      where: { id: staffUserId },
      select: {
        name: true, // スタッフの名前
        staffng: {
          select: {
            ymd: true,
            time: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Success", staffNgData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Server Error", err }, { status: 500 });
  }
};
