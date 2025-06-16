import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

async function generateUniqueLockerNumber(): Promise<string> {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const currentDay = new Date().getDate().toString().padStart(2, "0");

  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    // Generate a random 6-digit number
    const randomNum = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const lockerNumber = `SF-${currentYear}D${currentMonth}${currentDay}-${randomNum}`;

    // Check if the number already exists
    const existingUser = await User.findOne({ lockerNumber });
    if (!existingUser) {
      return lockerNumber;
    }
    attempts++;
  }

  throw new Error(
    "Failed to generate unique locker number after multiple attempts"
  );
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectDB();

    // Get user data from Clerk
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data from Clerk");
    }

    const userData = await response.json();
    const primaryEmail = userData.email_addresses?.[0]?.email_address;

    if (!primaryEmail) {
      return new Response("No email found", { status: 400 });
    }

    // Check if user exists in MongoDB
    const existingUser = await User.findOne({ email: primaryEmail });

    if (!existingUser) {
      try {
        // Generate unique locker number for new user
        const lockerNumber = await generateUniqueLockerNumber();

        // Create new user in MongoDB
        await User.create({
          email: primaryEmail,
          name: `${userData.first_name || ""} ${
            userData.last_name || ""
          }`.trim(),
          clerkId: userId,
          // Generate a random password since we're using Clerk for auth
          password: Math.random().toString(36).slice(-8),
          lockerNumber,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    } else if (!existingUser.clerkId) {
      // Update existing user with Clerk ID
      existingUser.clerkId = userId;
      await existingUser.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error syncing user:", error);
    return new Response("Error syncing user", { status: 500 });
  }
}
