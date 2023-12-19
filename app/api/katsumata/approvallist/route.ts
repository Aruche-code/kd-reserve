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

// 仮の予約待ちリスト(WaitingList)に予約を追加するAPI
export const POST = async (req: Request, res: NextResponse) => {
    console.log("POST WaitingList");
    try {
        await main();   // DB接続関数の呼び出し
        // const staffEmail = await getStaffUsers();       // 教員セッション情報を取得
        // const email = await getUsermail();              // 変数emailにセッション情報から取得したemail情報を格納する
        const email = "sample3@gmail.com"     // 変数emailにダミーのメールアドレスを格納する
        const {
            staffEmail,
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
        const waitingList = await prisma.waitingList.create({
            data: {
                staffEmail,
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
                user: { connect: { email } },   // 既存のUserとStudentProfileの関連付け
            },
            include: {
                user: true,             // userテーブルも含めて取得
            },
        });
        return NextResponse.json(
            { message: "Success", waitingList },
            { status: 200 }           // ステータスコード all OK
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 });         // ステータスコード Internal Server Error
    } finally {
        await prisma.$disconnect(); // DBへの接続を解除
        console.log("DB切断");      // DB切断成功時のログ出力
    }
};

// 指定したemailをもつUserのWaitinglistを表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET");

    try {
        // const email = await getUsermail() 本番
        const email = "sample3@gmail.com" //テスト
        await main();
        const wait = await prisma.user.findMany({
            where: { email },
            include: {
                waitinglist: true
            },
        });

        return NextResponse.json({ message: "Success", wait }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// 指定したemailのWatinglistを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
    console.log("DELETE");

    try {
        // const email = await getUsermail() 本番
        const email = "sample3@gmail.com" //テスト
        await main();

        // Userを検索
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                waitinglist: true,
            },
        });

        if (user) {
            // Waitinglistが存在する場合、削除
            await prisma.waitingList.deleteMany({
                where: {
                    userId: user.id,
                },
            });

            return NextResponse.json({ message: "Success" }, { status: 200 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
