import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth"
import getStaffUsers from '../../../actions/getStaffUsers';

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
// 先生のプロフィール等の表示   ＊修正が必要(レスポンスを職員の名前だけにする)
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET_Staff");
    try {
        await main();                                   // DBに接続
        const staffUsers = await getStaffUsers()        // actionsファイルに定義されているgetStaffUsers関数を使用して職員をすべて取得
        return NextResponse.json({ message: "Success", staffUsers }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};


/*
// POST
// 許可された日程の中から面談を予約し、予約データをwaitingListモデルに保存する
export const POST = async (req: Request, res: NextResponse) => {
    console.log("予約");
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


// セッション情報を取得するAPI
export const GET_Session = async (req: Request, res: NextResponse) => {
    console.log("Session情報取得");
    try {
        await main();                                   // DBに接続
        const session = await getServerSession()        // 変数sessionにセッション情報を格納
        console.log(session)

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};
*/
