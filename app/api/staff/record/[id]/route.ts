import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

// このエンドポイントは、生徒ごとの履歴を取得するAPIです。
// APIで仕様する検索用キーに生徒のユーザーモデルのオブジェクトIDが必要

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getSession();

    // セッション情報が存在しない、またはセッションにユーザーのメールアドレスが含まれていない場合、nullを返す
    if (!session?.user?.email) {
      return ;
    }

    // URLの動的な部分からstudentUserIdを抽出
    const studentUserId = req.nextUrl.pathname.split("/").pop();

    const users = await prisma.user.findMany({
      where: { id: studentUserId },
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
    return NextResponse.json({ message: "Server Error", err }, { status: 500 });
  }
};
