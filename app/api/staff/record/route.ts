import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getUserMail from "@/app/actions/getUserMail";

const prisma = new PrismaClient();

// 指定したemailをもつUserのRecordを表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();

    const users = await prisma.user.findMany({
      where: { email },
      include: {
        studentProfile: true,
        record: true,
      },
    });

    const responseData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      studentProfile: user.studentProfile
        ? {
          department: user.studentProfile?.department,
          schoolYear: user.studentProfile?.schoolYear,
          tel: user.studentProfile?.tel,
          graduationYear: user.studentProfile?.graduationYear,
          qualification: user.studentProfile?.qualification,
          workLocation: user.studentProfile?.workLocation,
        }
        : null,
      records: user.record
        ? user.record.map((record) => ({
          recordId: record.id,
          content: record.content,
          progress: record.progress,
          ymd: record.ymd,
        }))
        : null,
    }));

    return NextResponse.json(
      { message: "Success", responseData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// 指定したemailのUserにRecordを作成するAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();
    const { content, progress, ymd } = await req.json();

    const record = await prisma.record.create({
      data: {
        content,
        progress,
        ymd,
        // 既存のUserとrecordの関連付け
        user: { connect: { email } },
      },
    });

    return NextResponse.json({ message: "Success", record }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// 指定したemailのStudentprofileを編集するAPI
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const { recordId, content, progress, ymd } = await req.json();

    const user = await prisma.record.update({
      where: { id: recordId },
      data: {
        content,
        progress,
        ymd,
      },
    });

    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

// 指定したrecordを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    // 操作している職員のidを取得
    const userMail = await getUserMail();
    const record: any = await prisma.user.findUnique({
      where: { email: userMail },
      select: {
        id: true, // 学生のid
      },
    });
    const recordId: any = record.id;

    const user = await prisma.record.delete({
      where: {
        id: recordId,
      },
    });

    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
