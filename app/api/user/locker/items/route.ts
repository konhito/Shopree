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

    // Return the locker array from the user document
    return NextResponse.json({ items: user.locker || [] });
  } catch (error) {
    console.error("Error fetching locker items:", error);
    return new Response("Error fetching locker items", { status: 500 });
  }
}
