import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUsermail from "@/app/actions/getUserMail";

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// GET
// 先生のプロフィール等の表示   ＊2023-12-19 最終編集 後々職員プロフィール情報がレスポンスに追加される可能性あり
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main(); // dbに接続
    const staffUsers = await prisma.user.findMany({
      where: { role: "staff" },
      select: {
        id: true, // スタッフのid
        name: true, // スタッフの名前
        staffProfile: {
          // 職員のプロフィール情報
          select: {
            gender: true, // 性別
            Strengths: true, // 得意なこと
            tastes: true, // 趣味
            workhistory: true, // 勤務歴
          },
        },
      },
    });
    return NextResponse.json(
      { message: "Success", staffUsers },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // DBへの接続を閉じる
  }
};

// POST
// 指定したemailのUserにWaitingListを追加するAPI
// このAPIのテストを行うにはUserモデルからstaffユーザーのオブジェクトidをPOSTのパラメータに指定する必要があります
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUsermail(); // 本番用
    // const email = "giwa@mail.com"; // テスト用 予約画面を操作している学生のメールアドレスを取得
    const {
      staffUserId,
      details,
      firstYmd,
      firstStartTime,
      firstEndTime,
      secondYmd,
      secondStartTime,
      secondEndTime,
      thirdYmd,
      thirdStartTime,
      thirdEndTime,
    } = await req.json();
    await main();

    // 予約情報をUserモデルの中の操作している学生のWaitingListに保存する
    await prisma.waitingList.create({
      data: {
        staffUserId,
        details,
        firstYmd,
        firstStartTime,
        firstEndTime,
        secondYmd,
        secondStartTime,
        secondEndTime,
        thirdYmd,
        thirdStartTime,
        thirdEndTime,
        // 既存のUserとWaitingListとの関連付け
        user: { connect: { email } },
      },
      include: {
        user: true, // userテーブルも含めて取得
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
