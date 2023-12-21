import getSession from "./getSession";

// 使い方 const usermail = await getUsermail();

const getUsermail = async () => {
  try {
    const session = await getSession();

    // セッション情報が存在しない、またはセッションにユーザーのメールアドレスが含まれていない場合、nullを返す
    if (!session?.user?.email) {
      return null;
    }

    return session.user.email;
  } catch (error) {
    return null;
  }
};

export default getUsermail;
