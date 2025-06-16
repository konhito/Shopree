"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Package, Truck } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import LockerItems from "@/components/locker-items";

export default function LockerPage() {
  const [lockerNumber, setLockerNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get locker number from localStorage
    const storedLocker = localStorage.getItem("lockerNumber");
    if (storedLocker) {
      setLockerNumber(storedLocker);
    }
    setLoading(false);
  }, []);

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">My Locker</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Locker Number
              </CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "Loading..." : lockerNumber || "No locker assigned"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Packages
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Locker Items</CardTitle>
            </CardHeader>
            <CardContent>
              <LockerItems />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Locker Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Locker Number
                    </p>
                    <p className="text-lg font-semibold">
                      {loading
                        ? "Loading..."
                        : lockerNumber || "No locker assigned"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="text-lg font-semibold text-green-600">
                      Active
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-lg">
                    IndianShoppre Pvt Ltd,{" "}
                    {loading
                      ? "Loading..."
                      : lockerNumber || "No locker assigned"}
                    , #218/190, Outer Ring Road
                    <br />
                    Agara, Sector 1, H.S.R. Layout
                    <br />
                    Near Hindustan Furnishing & Furniture
                    <br />
                    Bengaluru, Karnataka 560102
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
