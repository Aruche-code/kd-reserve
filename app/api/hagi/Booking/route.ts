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


// GET
// 先生のプロフィール等の表示   ＊2023-12-19 最終編集 後々職員プロフィール情報がレスポンスに追加される可能性あり
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();                                       // dbに接続
        const staffUsers = await prisma.user.findMany({
            where: { role: "staff" },
            select: {
                id: true,                   // スタッフのid
                name: true,                 // スタッフの名前
                staffProfile: {             // 職員のプロフィール情報
                    select: {
                        gender: true,       // 性別
                        Strengths: true,    // 得意なこと
                        tastes: true,       // 趣味
                        workhistory: true   // 勤務歴
                    }
                }
            },
        });
        return NextResponse.json({ message: "Success", staffUsers }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};


// POST
// 指定したemailのUserにWaitingListを追加するAPI
// このAPIのテストを行うにはUserモデルからstaffユーザーのオブジェクトidをPOSTのパラメータに指定する必要があります
export const POST = async (req: Request, res: NextResponse) => {
    try {
        // const email = getUserMail() // 本番用
        const email = "giwa@mail.com" // テスト用 予約画面を操作している学生のメールアドレスを取得
        const { staffUserId, details, firstYmd, firstStartTime, firstEndTime, secondYmd,
                secondStartTime, secondEndTime, thirdYmd, thirdStartTime, thirdEndTime } = await req.json();
        await main();

        // 予約情報をUserモデルの中の操作している学生のWaitingListに保存する
        const WaitingListCreate = await prisma.waitingList.create({
            data: {
                staffUserId,
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
                // 既存のUserとWaitingListとの関連付け
                user: { connect: { email } },
            },
            include: {
                user: true, // userテーブルも含めて取得
            },
        });

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


/*
// テスト用 削除予定
// 上のAPIで作成した情報確認用
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET");

    try {
        // const email = await getUsermail() 本番
        const email = "giwa@mail.com" //テスト
        await main();
        const user = await prisma.user.findMany({
            where: { email },
            include: {
                waitinglist: true // WaitingListテーブルも含めて取得
            },
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
*/

/*
// GET  ＊テスト用 WaitingListから直接検索できるか 削除予定
// 先生のプロフィール等の表示   ＊修正が必要(レスポンスを職員の名前,先生のプロフィールにする)
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET_Staff");
    try {
        await main();                     // dbに接続
        const staffUsers = await prisma.waitingList.findMany({
            where: { staffEmail: "staffsample1@email.com" },
        });
        return NextResponse.json({ message: "Success", staffUsers }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};
*/


/*
// セッション情報を取得するAPI      削除予定
export const GET = async (req: Request, res: NextResponse) => {
    console.log("Session情報取得");
    try {
        await main();                                   // DBに接続
        const email = await getUsermail();        // 変数sessionにセッション情報を格納
        console.log(session)
        console.log()

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();                     // DBへの接続を閉じる
    }
};
*/
