import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUsermail from "@/app/actions/getUsermail";

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// POST　＊後々POSTに変更
// このエンドポイントは、生徒側予約画面で職員ごとのNG日程を取得するAPIです。
// APIでしようする検索用キーに職員のユーザーモデルのオブジェクトIDが必要本番環境ではフロント側からオブジェクトIDを受け取る
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { staffUserId } = await req.json();
    await main(); // DB接続関数の呼び出し
    // const staffUserId = "657a50663dbe46e6c28b95ca"; // 変数staffUserIdに職員のオブジェクトidを格納する
    const staffNgData = await prisma.user.findMany({
      // findManyメソッドを使用して、StaffNgモデルから複数のレコードを取得
      where: { id: staffUserId }, // whereメソッドを使用して、staffUserIdが一致するレコードを取得
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
    return NextResponse.json({ message: "Error", err }, { status: 500 }); // ステータスコード Internal Server Error
  } finally {
    await prisma.$disconnect(); // DBへの接続を解除
  }
};
