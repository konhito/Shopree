import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return NextResponse.json({ lockerNumber: user.lockerNumber });
  } catch (error) {
    console.error("Error fetching locker number:", error);
    return new Response("Error fetching locker number", { status: 500 });
  }
}
