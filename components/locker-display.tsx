"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function LockerDisplay() {
  const { isSignedIn } = useAuth();
  const [lockerNumber, setLockerNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLockerNumber = async () => {
      if (!isSignedIn) return;

      try {
        // Check localStorage first
        const storedLocker = localStorage.getItem("lockerNumber");
        if (storedLocker) {
          setLockerNumber(storedLocker);
          setLoading(false);
          return;
        }

        // If not in localStorage, fetch from API
        const response = await fetch("/api/user/locker");
        if (!response.ok) {
          throw new Error("Failed to fetch locker number");
        }

        const data = await response.json();
        setLockerNumber(data.lockerNumber);

        // Store in localStorage for future use
        localStorage.setItem("lockerNumber", data.lockerNumber);
      } catch (err) {
        setError("Failed to load locker number");
        console.error("Error fetching locker number:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLockerNumber();
  }, [isSignedIn]);

  if (!isSignedIn) return null;
  if (loading) return <div>Loading locker information...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!lockerNumber) return <div>No locker number assigned</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Locker Number</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-2xl font-mono text-center">{lockerNumber}</p>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Please keep this number safe. You'll need it to access your locker.
      </p>
    </div>
  );
}
