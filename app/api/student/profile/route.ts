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

// 指定したemailのUserとStudentprofileを表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET");

  try {
    const email = await getUsermail();
    // const email = "sample3@gmail.com" //テスト
    await main();
    const user = await prisma.user.findMany({
      where: { email },
      include: {
        studentProfile: true, // studentProfileテーブルも含めて取得
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailのUserにStudentprofileを追加するAPI
export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST");

  try {
    // const email = await getUsermail();
    const email = "higa@mail.com"; //テスト
    const {
      department,
      schoolYear,
      tel,
      graduationYear,
      qualification,
      workLocation,
    } = await req.json();
    await main();

    const user = await prisma.studentProfile.create({
      data: {
        department,
        schoolYear,
        tel,
        graduationYear,
        qualification,
        workLocation,
        // 既存のUserとStudentProfileの関連付け
        user: { connect: { email } },
      },
      include: {
        user: true, // userテーブルも含めて取得
      },
    });

    return NextResponse.json({ message: "Success", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailのStudentprofileを編集するAPI
export const PUT = async (req: Request, res: NextResponse) => {
  console.log("PUT");

  try {
    const email = await getUsermail();
    // const email = "sample3@gmail.com" //テスト
    const {
      department,
      schoolYear,
      tel,
      graduationYear,
      qualification,
      workLocation,
    } = await req.json();
    await main();

    const user = await prisma.user.update({
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
        studentProfile: true, // studentProfileテーブルも含めて取得
      },
    });

    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 指定したemailのStudentprofileを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  console.log("DELETE");

  try {
    const email = await getUsermail();
    // const email = "sample3@gmail.com" //テスト
    await main();
    const user = await prisma.user.update({
      where: { email },
      data: {
        studentProfile: {
          delete: true,
        },
      },
      include: {
        studentProfile: true, // studentProfileテーブルも含めて取得
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
