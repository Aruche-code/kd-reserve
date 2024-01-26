import prisma from "@/app/libs/prismadb";

// 使い方
// const email = await getUserMail();
// const userid = await getUserId(email);

const getUserId = async (email: string) => {
  try {
    if (!email) {
      return null;
    } else {
      const UserData: any = await prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true, // idを取得
        },
      });

      return UserData.id;
    }
  } catch (error) {
    return null; // 引数で受け取ったemailのユーザは存在しません。
  }
};

export default getUserId;
