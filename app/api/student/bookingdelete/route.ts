import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import connectDb from "@/app/actions/connectDb";

// DELETE
// 指定された予定を削除するAPI
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const { scheduleId } = await req.json();

    await prisma.booking.delete({
      where: { id: scheduleId },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
