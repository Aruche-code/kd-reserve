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

// postコレクションから_idオブジェクト指定しドキュメントを取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
    console.log("GET");

    try {
        const id = req.url.split("/student/")[1]; //http://localhost:3000/api/student/id
        await main();
        const post = await prisma.testUser.findMany({
            where: { id },
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// postコレクションから_idオブジェクト指定しドキュメントを編集するAPI
export const PUT = async (req: Request, res: NextResponse) => {
    console.log("PUT");

    try {
        const id = req.url.split("/student/")[1]; //http://localhost:3000/api/student/id

        const { name, hashedPassword } = await req.json();
        await main();
        const post = await prisma.testUser.update({
            where: { id },
            data: { name, hashedPassword },
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// postコレクションから_idオブジェクト指定しドキュメントを削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
    console.log("DELETE");

    try {
        const id = req.url.split("/student/")[1]; //http://localhost:3000/api/student/id
        const { title, description } = await req.json();
        await main();
        const post = await prisma.post.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};