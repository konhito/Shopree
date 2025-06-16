import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Locker, { IShipmentItem } from "@/models/Locker";

interface FormattedLocker {
  lockerNumber: string;
  status: string;
  totalValue: number;
  createdAt: Date;
  items: IShipmentItem[];
  totalItems: number;
}

export async function GET(
  req: Request,
  { params }: { params: { lockerNumber: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const lockerNumber = params.lockerNumber;
    console.log(
      "GET /api/locker/[lockerNumber] - Fetching locker:",
      lockerNumber
    );

    const locker = await Locker.findOne({ lockerNumber });

    if (!locker) {
      console.log(
        "GET /api/locker/[lockerNumber] - Locker not found:",
        lockerNumber
      );
      return NextResponse.json(
        { message: "Locker not found" },
        { status: 404 }
      );
    }

    // Format the response
    const formattedLocker: FormattedLocker = {
      lockerNumber: locker.lockerNumber,
      status: locker.status,
      totalValue: locker.totalValue,
      createdAt: locker.createdAt,
      items: locker.items.map((item: IShipmentItem) => ({
        title: item.title,
        img: item.img,
        quantity: item.quantity,
        price: item.price,
        description: item.description,
      })),
      totalItems: locker.items.length,
    };

    console.log("GET /api/locker/[lockerNumber] - Found locker:", {
      lockerNumber,
      items: formattedLocker.items.length,
      status: formattedLocker.status,
    });

    return NextResponse.json(formattedLocker);
  } catch (error) {
    console.error("GET /api/locker/[lockerNumber] - Error:", error);
    return NextResponse.json(
      {
        message: "Error fetching locker",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
