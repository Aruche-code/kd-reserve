import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth"
import getStaffUsers from '../../../actions/getStaffUsers';
import getUsermail from '../../../actions/getStaffUsers';

const prisma = new PrismaClient();

// DB接続関数
export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

// POST
// テスト用 削除予定
// 職員プロフィール入力用API
export const POST = async (req: Request, res: NextResponse) => {
    try {
        // const email = getUserMail() // 本番用
        const email = "yama@master.mail.com" // テスト
        const { gender, Strengths, tastes, workhistory } = await req.json();
        await main();

        const StaffProfileCreate = await prisma.staffProfile.create({
            data: {
                gender,
                Strengths,
                tastes,
                workhistory,
                // 既存のUserとStudentProfileの関連付け
                user: { connect: { email } },
            },
            include: {
                user: true, // userテーブルも含めて取得
            },
        });

        return NextResponse.json({ message: "Success", StaffProfileCreate }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
