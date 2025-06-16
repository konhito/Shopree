"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function UserSync() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch("/api/user/sync", {
            method: "POST",
          });

          if (!response.ok) {
            throw new Error("Failed to sync user");
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };

    syncUser();
  }, [isSignedIn]);

  return null;
}
