import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

// role が 'staff' であるユーザー (role: "staff")
// これらの条件を満たすユーザーをデータベースから検索し、結果を返します。

// 使い方 const staffuseres = await getStaffUsers();

const getStaffUsers = async () => {
  const session = await getSession();

  // セッション情報が存在しない、またはセッションにユーザーのメールアドレスが含まれていない場合
  if (!session?.user?.email) {
    return [];
  }

  try {
    const staffusers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "staff",
      },
    });
    return staffusers;
  } catch (error: any) {
    return [];
  }
};

export default getStaffUsers;
