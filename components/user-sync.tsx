"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserSync() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        // Clear all local storage when user logs out
        localStorage.clear();
        console.log("UserSync: Cleared local storage on logout");
        return;
      }

      try {
        console.log("UserSync: Starting user sync");
        const response = await fetch("/api/user/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("UserSync: Error syncing user:", errorData);
          return;
        }

        const data = await response.json();
        console.log("UserSync: User sync successful:", data);

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("UserSync: Stored user data in local storage");

        toast.success("User synchronized successfully");
      } catch (error) {
        console.error("UserSync: Error in sync process:", error);
        toast.error("Failed to sync user");
      }
    };

    syncUser();
  }, [userId, isLoaded, isSignedIn, router]);

  return null;
}
