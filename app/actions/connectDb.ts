import prisma from "@/app/libs/prismadb";

// 使い方 await connectDb;

// DB接続関数
const connectDb = async () => {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
};

export default connectDb;
