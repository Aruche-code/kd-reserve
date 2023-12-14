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

// 指定したemailのUserとStudentprofileを表示するAPI
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET");

    try {
        // const email = await getUsermail() 本番
        const email = "sample3@gmail.com" //テスト
        await main();
        const user = await prisma.user.findMany({
            where: { email },
            include: {
                studentProfile: true // studentProfileテーブルも含めて取得
            },
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// 指定したemailのUserにStudentprofileを追加するAPI
export const POST = async (req: Request, res: NextResponse) => {
    console.log("POST");

    try {
        // const email = await getUsermail() 本番
        const email = "sample3@gmail.com" //テスト
        const { department, tel, graduationYear, qualification } = await req.json();
        await main();

        const user = await prisma.studentProfile.create({
            data: {
                department,
                tel,
                graduationYear,
                qualification,
                // 既存のUserとStudentProfileの関連付け
                user: { connect: { email } },
            },
            include: {
                user: true, // userテーブルも含めて取得
            },
        });

        return NextResponse.json({ message: "Success", user }, { status: 201 });
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
        // const email = await getUsermail() 本番
        const email = "sample3@gmail.com" //テスト
        const { name, image, department, tel, graduationYear, qualification } = await req.json();
        await main();

        const user = await prisma.user.update({
            where: { email },
            data: {
                name,
                image,
                studentProfile: {
                    update: {
                        department,
                        tel,
                        graduationYear,
                        qualification,
                    },
                },
            },
            include: {
                studentProfile: true, // studentProfileテーブルも含めて取得
            },
        });

        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


// 指定したemailのStudentprofileを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
    console.log("DELETE");

    try {
        // const email = await getUsermail() 本番
        const email = "sample3@gmail.com" //テスト
        await main();
        const user = await prisma.user.update({
            where: { email },
            data: {
                studentProfile: {
                    delete: true,
                },
            },
            include: {
                studentProfile: true, // studentProfileテーブルも含めて取得
            },
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};