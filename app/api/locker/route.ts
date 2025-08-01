import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Locker from "@/models/Locker";
import User from "@/models/User";

interface LockerItem {
  title: string;
  img: string;
  quantity: number;
  price: number;
  description?: string;
}

interface FormattedLocker {
  lockerNumber: string;
  status: string;
  totalValue: number;
  createdAt: Date;
  items: LockerItem[];
  totalItems: number;
}

export async function POST(req: Request) {
  console.log("Locker API: Starting locker creation/update process");

  try {
    const { userId } = await auth();
    console.log("Locker API: Clerk userId =", userId);

    if (!userId) {
      console.log("Locker API: No userId found in auth");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("Locker API: Connecting to MongoDB");
    try {
      await connectDB();
      console.log("Locker API: MongoDB connected successfully");
    } catch (error) {
      console.error("Locker API: MongoDB connection error:", error);
      return NextResponse.json(
        {
          message: "Database connection error",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    // Get user data
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      console.log("Locker API: User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get request data
    const { lockerNumber, items } = await req.json();
    console.log("Locker API: Request data =", { lockerNumber, items });

    if (
      !lockerNumber ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      console.log("Locker API: Invalid request data");
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    // Check if locker already exists
    const existingLocker = await Locker.findOne({ lockerNumber });

    if (existingLocker) {
      console.log("Locker API: Locker exists, updating with new items");

      try {
        // Add new items to existing locker
        existingLocker.items.push(...items);

        // The pre-save hook will automatically recalculate totalValue
        const updatedLocker = await existingLocker.save();

        console.log("Locker API: Locker updated successfully =", {
          lockerNumber: updatedLocker.lockerNumber,
          totalItems: updatedLocker.items.length,
          totalValue: updatedLocker.totalValue,
        });

        // Make sure user has this locker in their array (in case it wasn't there)
        if (!user.locker.includes(lockerNumber)) {
          user.locker.push(lockerNumber);
          await user.save();
          console.log("Locker API: Added locker to user's array");
        }

        return NextResponse.json({
          success: true,
          message: "Items added to existing locker successfully",
          locker: {
            lockerNumber: updatedLocker.lockerNumber,
            items: updatedLocker.items,
            status: updatedLocker.status,
            totalValue: updatedLocker.totalValue,
            totalItems: updatedLocker.items.length,
          },
          isUpdate: true,
        });
      } catch (error) {
        console.error("Locker API: Error updating locker:", error);
        return NextResponse.json(
          {
            message: "Error updating locker",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 }
        );
      }
    } else {
      // Create new locker if it doesn't exist
      console.log("Locker API: Creating new locker");

      try {
        const newLocker = new Locker({
          lockerNumber,
          items,
          status: "pending",
        });

        console.log("Locker API: About to save new locker with data:", {
          lockerNumber: newLocker.lockerNumber,
          itemsCount: newLocker.items.length,
          status: newLocker.status,
        });

        const savedLocker = await newLocker.save();
        console.log("Locker API: New locker created =", savedLocker);

        // Update user's locker array
        user.locker.push(lockerNumber);
        await user.save();
        console.log("Locker API: Updated user's locker array");

        return NextResponse.json({
          success: true,
          message: "New locker created successfully",
          locker: {
            lockerNumber: savedLocker.lockerNumber,
            items: savedLocker.items,
            status: savedLocker.status,
            totalValue: savedLocker.totalValue,
            totalItems: savedLocker.items.length,
          },
          isUpdate: false,
        });
      } catch (error) {
        console.error("Locker API: Error creating locker:", error);
        return NextResponse.json(
          {
            message: "Error creating locker",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Locker API: Error in process:", error);
    return NextResponse.json(
      {
        message: "Error processing request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    console.log("GET /api/locker - Auth userId:", userId);

    if (!userId) {
      console.log("GET /api/locker - No userId found in auth");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    console.log("GET /api/locker - Connected to MongoDB");

    // Get user data
    const user = await User.findOne({ clerkId: userId });
    console.log("GET /api/locker - Found user:", {
      userId,
      userExists: !!user,
      lockerArray: user?.locker || [],
    });

    if (!user) {
      console.log("GET /api/locker - User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get lockers that match the user's locker array with populated items
    const lockers = await Locker.find({
      lockerNumber: { $in: user.locker },
    })
      .select("lockerNumber items status totalValue createdAt")
      .sort({ createdAt: -1 });

    // Format the response to include detailed item information
    const formattedLockers: FormattedLocker[] = lockers.map((locker) => ({
      lockerNumber: locker.lockerNumber,
      status: locker.status,
      totalValue: locker.totalValue,
      createdAt: locker.createdAt,
      items: locker.items.map((item: LockerItem) => ({
        title: item.title,
        img: item.img,
        quantity: item.quantity,
        price: item.price,
        description: item.description,
      })),
      totalItems: locker.items.length,
    }));

    console.log("GET /api/locker - Query results:", {
      userId,
      lockerNumbers: user.locker,
      foundLockers: lockers.length,
      lockerDetails: formattedLockers.map((l) => ({
        number: l.lockerNumber,
        items: l.items.length,
        status: l.status,
        totalValue: l.totalValue,
      })),
    });

    return NextResponse.json(formattedLockers);
  } catch (error) {
    console.error("GET /api/locker - Error:", error);
    return NextResponse.json(
      {
        message: "Error fetching lockers",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
