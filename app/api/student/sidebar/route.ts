import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getUserMail from "@/app/actions/getUserMail";

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const email = await getUserMail();

        const user = await prisma.user.findMany({
            where: { email },
        });

        // 必要なフィールドだけを含むレスポンスを作成
        const responseData = user.map((user) => ({
            name: user.name,
            email: user.email,
            image: user.image
        }));

        return NextResponse.json(
            { message: "Success", user: responseData },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};