import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getUserMail from "@/app/actions/getUserMail";

const prisma = new PrismaClient();

// DB接続関数
export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

// GET
// 職員ごとの確定した予定の取得用API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();                                       // dbに接続

        // 操作している学生のidを取得
        /*
        const usermail = await getUserMail();
        const student : any = await prisma.user.findUnique({
            where: { email: usermail },
            select: {
                id: true,                   // 学生のid
            },
        });

        const studentId: any = student.id
        */

        // テスト用
        const studentId = "657babf0d296390e67a452ef"

        const getBookingList = await prisma.booking.findMany({

            where: { studentUserId: studentId },
            select: {
                staffName: true,
                ymd: true,
                time: true,
                details: true
            },
        });

        const getWaitingList = await prisma.waitingList.findMany({

            where: { studentUserId: studentId },
            select: {
                id: true,
                staffName: true,
                details: true,
                firstYmd: true,
                firstStartTime: true,
                firstEndTime: true,
                secondYmd: true,
                secondStartTime: true,
                secondEndTime: true,
                thirdYmd: true,
                thirdStartTime: true,
                thirdEndTime: true,
            },
        });

        return NextResponse.json({ message: "Success", getBookingList, getWaitingList }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};


// DELETE
// 指定された予定を削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {

    try {
        const { scheduleId, } = await req.json();

        await main();
        const user = await prisma.waitingList.delete({
            where: { id: scheduleId },
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
