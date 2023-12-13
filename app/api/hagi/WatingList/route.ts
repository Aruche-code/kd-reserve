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

/*
// create
// 予約待ちリストに追加するAPI
export const POST = async (req: Request, res: NextResponse) => {
    console.log("create");
    try {
        const { student_email, staff_email, ymd, time, details } = await req.json();
        await main();
        const create = await prisma.waitingList.create({
            data: {
                student_email,
                staff_email,
                ymd,
                time,
                details
            },
        });
        return NextResponse.json({ message: "Success", create }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
*/

/*
// READ
// 指定された先生の予約待ちリストをすべて取得するAPI
export const GETS = async (req: Request, res: NextResponse) => {
    console.log("GETS");
    try {
        await main();                                   // DBに接続
        const email = "kd12345@st.kobedenshi.ac.jp"     // 変数emailにダミーのメールアドレスを格納
        const gets = await prisma.staffNg.findMany({
            where: { email }
        });
        return NextResponse.json({ message: "Success", gets }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};
*/
