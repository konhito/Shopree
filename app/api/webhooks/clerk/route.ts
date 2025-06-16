import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Connect to MongoDB
  await connectDB();

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const primaryEmail = email_addresses?.[0]?.email_address;

    if (!primaryEmail) {
      return new Response("No email found", { status: 400 });
    }

    try {
      // Check if user exists
      const existingUser = await User.findOne({ email: primaryEmail });

      if (existingUser) {
        // Update existing user
        existingUser.name = `${first_name || ""} ${last_name || ""}`.trim();
        await existingUser.save();
      } else {
        // Create new user
        await User.create({
          email: primaryEmail,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
          // Generate a random password since we're using Clerk for auth
          password: Math.random().toString(36).slice(-8),
        });
      }

      return new Response("User synced successfully", { status: 200 });
    } catch (error) {
      console.error("Error syncing user:", error);
      return new Response("Error syncing user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      // Delete user from MongoDB
      await User.deleteOne({ clerkId: id });
      return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
