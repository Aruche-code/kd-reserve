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

// create
// NG日の作成を行う
export const POST = async (req: Request, res: NextResponse) => {
    console.log("create");
    try {
        const { email, ymd, time } = await req.json();
        await main();
        const create = await prisma.staffNg.create({
            data: {
                email,
                ymd,
                time
            },
        });
        return NextResponse.json({ message: "Success", create }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// 特定の先生のNG日をすべて取得するAPI
// StaffNgコレクションからemailオブジェクト指定しドキュメントを取得している
export const GETS = async (req: Request, res: NextResponse) => {
    console.log("GETS");
    try {
        await main();                                   // DBに接続
        const email = "kd12345@st.kobedenshi.ac.jp"     // 変数emailにダミーのメールアドレスを格納
        const posts = await prisma.staffNg.findMany({
            where: { email }
        });
        return NextResponse.json({ message: "Success", posts }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};

// 特定の先生の特定のNG日を取得するAPI
// StaffNgコレクションからemailオブジェクト指定しドキュメントを取得している
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET");
    try {
        await main();                                   // DBに接続
        const email = "kd12345@st.kobedenshi.ac.jp"     // 変数emailにダミーのメールアドレスを格納
        const ymd = "2023/12/13"                        // 変数ymdにダミーの日付を格納

        const post = await prisma.staffNg.findUnique({
            where: {
                staffng_identifier: {
                    email,
                    ymd
                }
            }
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};

// update
// 職員のNG日を上書き保存
export const PUT = async (req: Request, res: NextResponse) => {
    console.log("PUT");
    try {
        const { email, ymd, time } = await req.json();
        await main();
        const create = await prisma.staffNg.update({
            where: {
                staffng_identifier: {
                    email,
                    ymd
                }
            },
            data: {
                time
            },
        });
        return NextResponse.json({ message: "Success", create }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// delete
// 職員のNG日の削除
export const DELETE = async (req: Request, res: NextResponse) => {
    console.log("DELETE");
    try {
        await main();                                   // DBに接続
        const email = "kd12345@st.kobedenshi.ac.jp"     // 変数emailにダミーのメールアドレスを格納
        const ymd = "2023/12/13"                        // 変数ymdにダミーの日付を格納

        const post = await prisma.staffNg.delete({
            where: {
                staffng_identifier: {
                    email,
                    ymd
                }
            }
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};
