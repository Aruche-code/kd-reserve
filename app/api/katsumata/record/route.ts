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

// 指定したemailをもつUserのRecordを表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET");

    try {
        // const email = await getUsermail() 本番
        const email = "sample3@gmail.com" //テスト
        await main();
        const users = await prisma.user.findMany({
            where: { email },
            include: {
                studentProfile: true,
                record: true
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
                    content: record.content,
                    progress: record.progress,
                }))
                : null,
        }));



        return NextResponse.json({ message: "Success", responseData }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// 指定したemailのUserにRecordを作成するAPI
export const POST = async (req: Request, res: NextResponse) => {
    console.log("POST");

    try {
        const email = "sample3@gmail.com"; // テスト
        const { content, progress } = await req.json();
        await main();

        const record = await prisma.record.create({
            data: {
                content,
                progress,
                // 既存のUserとrecordの関連付け
                user: { connect: { email } },
            },
        });

        return NextResponse.json({ message: "Success", record }, { status: 201 });
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
        const recordId = "658eedaad7973a3b99ca5db0" // staffNgIdに職員のオブジェクトidを格納する
        const { content, progress } = await req.json();
        await main();

        const user = await prisma.record.update({
            where: { id: recordId },
            data: {
                content,
                progress
            },
        });

        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// 指定したrecordを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
    console.log("DELETE");

    try {
        const recordId = "658eedaad7973a3b99ca5db0" // staffNgIdに職員のオブジェクトidを格納する
        await main();
        const user = await prisma.record.delete({
            where: {
                id: recordId
            },
        });

        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};