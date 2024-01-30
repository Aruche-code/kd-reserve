import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

// 指定された予定を削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const { scheduleId } = await req.json();

    await prisma.booking.delete({
      where: { id: scheduleId },
    });

    await pusherServer.trigger(
      "booking-delete-channel",
      "booking-delete-event",
      {
        message: "New booking delete",
      }
    );

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
