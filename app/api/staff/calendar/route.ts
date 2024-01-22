import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";
import getUserId from "@/app/actions/getUserId";
import { User } from '../../../components/types';

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

// NG日程の作成
export const POST = async (req: Request, res: NextResponse) => {
  try {
    //const staffEmail = await getStaffUsers();    // 教員セッション情報を取得
    const email = await getUserMail(); // 変数emailにセッション情報から取得したemail情報を格納する

    await main();
    const { ymd, time } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const postedStaffNg = await prisma.staffNg.create({
      // emailと一致するuserにstaffNgを作成
      data: {
        ymd,
        time,
        user: {
          connect: { id: user?.id },
        },
      },
    });

    return NextResponse.json(
      { message: "Success" /* postedStaffNg */ },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// NG日程と予約確定日時の表示
export const GET = async (req: Request, res: NextResponse) => {

  try {
    const email = await getUserMail()  // 変数emailにセッション情報から取得したemail情報を格納する

    // 職員のidを取得
    const staffData: any = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true, // 職員のidを取得
      },
    });

    const staffUserId: any = staffData.id;

    await main();

    const getstaffng = await prisma.user.findUnique({
      where: { email },
      select: {
        staffng: {
          select: {
            ymd: true,
            time: true,
          }
        }
      },
    });

    const getbooking = await prisma.booking.findMany({
      where: { staffUserId: staffUserId },
      select: {
        studentName: true,
        ymd: true,
        time: true,
        details: true,
      }
    })

    const responseData = {
        staffng: getstaffng?.staffng,
        booking: getbooking,
    };

    return NextResponse.json(
      { message: "Success", responseData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したidのNG日程を編集
export const PUT = async (req: Request, res: NextResponse) => {

  try {
    const email = await getUserMail()  // 変数emailに操作している職員のメールアドレスを挿入
    const staffNgId = await getUserId(email); // staffNgIdに職員のオブジェクトidを格納する

    await main();
    const { ymd, time } = await req.json();

    const updatedStaffNg = await prisma.staffNg.update({
      // staffNgIdと一致するstaffNgテーブルを編集
      where: { id: staffNgId },
      data: {
        ymd,
        time,
      },
    });

    return NextResponse.json(
      { message: "Success" /* updatedStaffNg */ },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したidのNG日程を削除
export const DELETE = async (req: Request, res: NextResponse) => {

  try {
    const staffNgId = "658eedaad7973a3b99ca5db0"; // staffNgIdに職員のオブジェクトidを格納する
    await main();
    const deletedStaffNg = await prisma.staffNg.delete({
      // staffNgIdと一致するstaffNgテーブルを削除
      where: {
        id: staffNgId,
      },
    });

    return NextResponse.json(
      { message: "Success" /* deletedStaffNg */ },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
