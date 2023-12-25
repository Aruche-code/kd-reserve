import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";

// DB接続関数
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();

    await main();
    const user = await prisma.user.findMany({
      where: { email },
      include: {
        studentProfile: true, // studentProfileテーブルも含めて取得
      },
    });

    // 必要なフィールドだけを含むレスポンスを作成
    const responseData = user.map((user) => ({
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
    }));

    return NextResponse.json(
      { message: "Success", user: responseData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailのStudentprofileを作成するAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();

    const {
      department,
      schoolYear,
      tel,
      graduationYear,
      qualification,
      workLocation,
    } = await req.json();

    await main();

    const newStudentProfile = await prisma.studentProfile.create({
      data: {
        department,
        schoolYear,
        tel,
        graduationYear,
        qualification,
        workLocation,
        user: { connect: { email } },
      },
    });

    // studentProfileのみをレスポンスとして返却
    const responseData = {
      department: newStudentProfile?.department,
      schoolYear: newStudentProfile?.schoolYear,
      tel: newStudentProfile?.tel,
      graduationYear: newStudentProfile?.graduationYear,
      qualification: newStudentProfile?.qualification,
      workLocation: newStudentProfile?.workLocation,
    };

    return NextResponse.json(
      { message: "Success", studentProfile: responseData },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailのStudentprofileを編集するAPI
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();

    const {
      department,
      schoolYear,
      tel,
      graduationYear,
      qualification,
      workLocation,
    } = await req.json();

    await main();

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        studentProfile: {
          update: {
            department,
            schoolYear,
            tel,
            graduationYear,
            qualification,
            workLocation,
          },
        },
      },
      include: {
        studentProfile: true, // 更新されたStudentProfileを含める
      },
    });

    // 更新されたStudentProfileの情報をレスポンスとして返却
    const responseData = updatedUser.studentProfile
      ? {
          department: updatedUser.studentProfile?.department,
          schoolYear: updatedUser.studentProfile?.schoolYear,
          tel: updatedUser.studentProfile?.tel,
          graduationYear: updatedUser.studentProfile?.graduationYear,
          qualification: updatedUser.studentProfile?.qualification,
          workLocation: updatedUser.studentProfile?.workLocation,
        }
      : null;

    return NextResponse.json(
      { message: "Success", studentProfile: responseData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailのStudentprofileを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const email = await getUserMail();

    await main();
    await prisma.user.update({
      where: { email },
      data: {
        studentProfile: {
          delete: true,
        },
      },
    });
    return NextResponse.json(
      { message: "Success", studentProfile: null },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
