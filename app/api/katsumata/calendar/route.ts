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

// NG日程の作成
export const POST = async (req: Request, res: NextResponse) => {
    console.log("create");
    try {
        // const staffEmail = await getStaffUsers();    // 教員セッション情報を取得
        // const email = await getUsermail();   // 変数emailにセッション情報から取得したemail情報を格納する
        const email = "sample3@gmail.com" // emailを格納
        await main();
        const { ymd, time } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        const postedStaffNg = await prisma.staffNg.create({ // emailと一致するuserにstaffNgを作成
            data: {
                ymd,
                time,
                user: {
                    connect: { id: user?.id },
                },
            },
        });

        return NextResponse.json({ message: "Success", /* postedStaffNg */ }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// NG日程と予約確定日時の表示
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET");

    try {
        // const email = await getUsermail()  // 変数emailにセッション情報から取得したemail情報を格納する
        const email = "sample3@gmail.com" // emailを格納
        await main();
        const getedStaffNgBooking = await prisma.user.findUnique({ // emailと一致するuserのid、名前、emailとstaffNgテーブル、bookingテーブルを表示
            where: { email },
            include: {
                staffng: true,
                booking: true,
            },
        });

        const responseData = getedStaffNgBooking  // responseの編集
            ? {
                id: getedStaffNgBooking.id,
                name: getedStaffNgBooking.name,
                email: getedStaffNgBooking.email,
                staffng: getedStaffNgBooking.staffng
                    ? getedStaffNgBooking.staffng.map((staffng) => ({
                        id: staffng?.id,
                        ymd: staffng?.ymd, // 年月日
                        time: staffng?.time, // 時間帯 ＊配列で格納
                    }))
                    : null,
                booking: getedStaffNgBooking.booking
                    ? getedStaffNgBooking.booking.map((booking) => ({
                        studentEmail: booking?.studentEmail, // 申請者メールアドレス
                        staffEmail: booking?.staffEmail, // 担当職員メールアドレス
                        ymd: booking?.ymd, // 年月日
                        time: booking?.time, // 時間帯 ＊配列で格納
                        details: booking?.details, // 面談内容
                    }))
                    : null,
            }
            : null;

        return NextResponse.json({ message: "Success", responseData }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// 指定したidのNG日程を編集
export const PUT = async (req: Request, res: NextResponse) => {
    console.log("PUT");

    try {
        const staffNgId = "658f7e5c30021c1f06d2181a" // staffNgIdに職員のオブジェクトidを格納する
        await main();
        const { ymd, time } = await req.json();

        const updatedStaffNg = await prisma.staffNg.update({ // staffNgIdと一致するstaffNgテーブルを編集
            where: { id: staffNgId },
            data: {
                ymd,
                time,
            },
        });

        return NextResponse.json({ message: "Success", /* updatedStaffNg */ }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// 指定したidのNG日程を削除
export const DELETE = async (req: Request, res: NextResponse) => {
    console.log("DELETE");

    try {
        const staffNgId = "658f7e5c30021c1f06d2181a" // staffNgIdに職員のオブジェクトidを格納する
        await main();
        const deletedStaffNg = await prisma.staffNg.delete({ // staffNgIdと一致するstaffNgテーブルを削除
            where: {
                id: staffNgId
            },
        });

        return NextResponse.json({ message: "Success", /* deletedStaffNg */ }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};