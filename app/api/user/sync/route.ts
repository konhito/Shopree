import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

async function generateUniqueLockerNumber(): Promise<string> {
  console.log("Sync API: Generating unique locker number");
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const currentDay = new Date().getDate().toString().padStart(2, "0");

  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const randomNum = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const lockerNumber = `SF-${currentYear}D${currentMonth}${currentDay}-${randomNum}`;
    console.log("Sync API: Generated locker number attempt:", lockerNumber);

    try {
      const existingUser = await User.findOne({ lockerNumber });
      if (!existingUser) {
        console.log("Sync API: Found unique locker number:", lockerNumber);
        return lockerNumber;
      }
      console.log("Sync API: Locker number already exists, trying again");
    } catch (error) {
      console.error("Sync API: Error checking locker number:", error);
      throw error;
    }
    attempts++;
  }

  throw new Error(
    "Failed to generate unique locker number after multiple attempts"
  );
}

export async function POST(req: Request) {
  console.log("Sync API: Starting user sync process");

  try {
    const { userId } = await auth();
    console.log("Sync API: Clerk userId =", userId);

    if (!userId) {
      console.log("Sync API: No userId found in auth");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("Sync API: Connecting to MongoDB");
    try {
      await connectDB();
      console.log("Sync API: MongoDB connected successfully");
    } catch (error) {
      console.error("Sync API: MongoDB connection error:", error);
      return NextResponse.json(
        {
          message: "Database connection error",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    // Get user data from Clerk
    console.log("Sync API: Fetching user data from Clerk");
    let userData;
    try {
      const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Sync API: Failed to fetch user data from Clerk:",
          errorText
        );
        throw new Error(`Failed to fetch user data from Clerk: ${errorText}`);
      }

      userData = await response.json();
      console.log("Sync API: User data from Clerk =", userData);
    } catch (error) {
      console.error("Sync API: Error fetching Clerk data:", error);
      return NextResponse.json(
        {
          message: "Error fetching user data from Clerk",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    const primaryEmail = userData.email_addresses?.[0]?.email_address;
    console.log("Sync API: Primary email =", primaryEmail);

    if (!primaryEmail) {
      console.log("Sync API: No email found in user data");
      return NextResponse.json({ message: "No email found" }, { status: 400 });
    }

    // Check if user exists in MongoDB by email only
    console.log("Sync API: Checking if user exists in MongoDB by email");
    let existingUser;
    try {
      existingUser = await User.findOne({ email: primaryEmail });
      console.log("Sync API: Existing user =", existingUser);
    } catch (error) {
      console.error("Sync API: Error finding user:", error);
      return NextResponse.json(
        {
          message: "Error checking existing user",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    if (!existingUser) {
      try {
        console.log("Sync API: User not found, creating new user");
        const lockerNumber = await generateUniqueLockerNumber();
        console.log("Sync API: Generated locker number =", lockerNumber);

        // Create user with explicit field values
        const newUser = new User({
          email: primaryEmail,
          name: `${userData.first_name || ""} ${
            userData.last_name || ""
          }`.trim(),
          clerkId: userId,
          password: Math.random().toString(36).slice(-8),
          lockerNumber,
          isClient: true,
          locker: [],
          itemIsReady: false,
          itemReceivedData: null,
        });

        console.log("Sync API: About to save user with data:", {
          email: newUser.email,
          name: newUser.name,
          lockerNumber: newUser.lockerNumber,
          clerkId: newUser.clerkId,
        });

        // Save the user
        const savedUser = await newUser.save();
        console.log("Sync API: New user created =", savedUser);

        return NextResponse.json({
          success: true,
          message: "New user created",
          user: {
            email: savedUser.email,
            name: savedUser.name,
            lockerNumber: savedUser.lockerNumber,
          },
        });
      } catch (error) {
        console.error("Sync API: Error creating user:", error);
        // If there's a duplicate key error, try to find the user again
        if (error instanceof Error && error.message.includes("duplicate key")) {
          try {
            existingUser = await User.findOne({ email: primaryEmail });
            if (existingUser) {
              return NextResponse.json({
                success: true,
                message: "User found",
                user: {
                  email: existingUser.email,
                  name: existingUser.name,
                  lockerNumber: existingUser.lockerNumber,
                },
              });
            }
          } catch (findError) {
            console.error(
              "Sync API: Error finding user after duplicate key error:",
              findError
            );
          }
        }
        return NextResponse.json(
          {
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 }
        );
      }
    }

    // If user exists, just return their data
    return NextResponse.json({
      success: true,
      message: "User found",
      user: {
        email: existingUser.email,
        name: existingUser.name,
        lockerNumber: existingUser.lockerNumber,
      },
    });
  } catch (error) {
    console.error("Sync API: Error in sync process:", error);
    return NextResponse.json(
      {
        message: "Error syncing user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
