import prisma from "@/app/libs/prismadb";

// 使い方
// const email = await getUserMail();
// const userid = await getUserId(email);

const getUserId = async (email: string) => {
  try {
    // 画面を操作しているユーザーのidを取得
    const UserData = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true, // idを取得
      },
    });

    // ユーザーデータが見つからない場合の処理
    if (!UserData) {
      return null;
    }

    return UserData.id;
  } catch (error) {
    return null; // エラーが発生した場合
  }
};

export default getUserId;
