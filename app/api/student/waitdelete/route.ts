import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

// DELETE
// 指定された予定を削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const { scheduleId } = await req.json();

    await prisma.waitingList.delete({
      where: { id: scheduleId },
    });

    // 職員側の承認待ち画面をリアルタイム更新
    await pusherServer.trigger(
      "waiting-delete-channel",
      "waiting-delete-event",
      {
        message: "New booking delete",
      }
    );
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
